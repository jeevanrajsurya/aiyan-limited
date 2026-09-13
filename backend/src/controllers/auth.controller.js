const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');

const isProduction = process.env.NODE_ENV === 'production';

const cookieOpts = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
};

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409);
    throw new Error('An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, phone },
  });

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res
    .cookie('accessToken', accessToken, cookieOpts)
    .cookie('refreshToken', refreshToken, cookieOpts)
    .status(201)
    .json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res
    .cookie('accessToken', accessToken, cookieOpts)
    .cookie('refreshToken', refreshToken, cookieOpts)
    .json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401);
    throw new Error('No refresh token');
  }

  try {
    const decoded = verifyRefreshToken(token);
    const accessToken = signAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    res.cookie('accessToken', accessToken, cookieOpts).json({ ok: true });
  } catch {
    res.status(401);
    throw new Error('Invalid refresh token');
  }
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken', cookieOpts).clearCookie('refreshToken', cookieOpts).json({ ok: true });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  res.json({ user });
});

module.exports = { register, login, refresh, logout, me };
