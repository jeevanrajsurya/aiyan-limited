const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// GET /api/products?category=&search=&page=&limit=
const listProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;
  const where = {
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(search && { name: { contains: search, mode: 'insensitive' } }),
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ items, total, page: Number(page), limit: Number(limit) });
});

// GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true },
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ product });
});

// POST /api/products (admin)
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  const product = await prisma.product.create({
    data: { name, description, price, stock: Number(stock) || 0, categoryId, imageUrl },
  });
  res.status(201).json({ product });
});

// PUT /api/products/:id (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl, isActive } = req.body;
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: { name, description, price, stock, categoryId, imageUrl, isActive },
  });
  res.json({ product });
});

// DELETE /api/products/:id (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
