const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// POST /api/contact
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email and message are required');
  }
  const contactMessage = await prisma.contactMessage.create({ data: { name, email, message } });
  res.status(201).json({ contactMessage });
});

// GET /api/contact — admin
const listMessages = asyncHandler(async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { submittedAt: 'desc' } });
  res.json({ messages });
});

module.exports = { sendMessage, listMessages };
