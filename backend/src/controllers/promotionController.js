const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// GET /api/promotions (Public)
const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await prisma.storePromotion.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ promotions });
});

// GET /api/promotions/admin (Admin)
const getAllPromotionsAdmin = asyncHandler(async (req, res) => {
  const promotions = await prisma.storePromotion.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ promotions });
});

// POST /api/promotions (Admin)
const createPromotion = asyncHandler(async (req, res) => {
  const { title, category, description, priceText, discountBadge, imageUrl, validUntil, sortOrder } = req.body;

  if (!title || !category) {
    res.status(400);
    throw new Error('Title and category are required');
  }

  const promotion = await prisma.storePromotion.create({
    data: {
      title,
      category,
      description: description || null,
      priceText: priceText || null,
      discountBadge: discountBadge || null,
      imageUrl: imageUrl || null,
      validUntil: validUntil ? new Date(validUntil) : null,
      sortOrder: Number(sortOrder) || 0,
    },
  });

  res.status(201).json({ promotion });
});

// PUT /api/promotions/:id (Admin)
const updatePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, description, priceText, discountBadge, imageUrl, validUntil, isActive, sortOrder } = req.body;

  const promotion = await prisma.storePromotion.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(priceText !== undefined && { priceText }),
      ...(discountBadge !== undefined && { discountBadge }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(validUntil !== undefined && { validUntil: validUntil ? new Date(validUntil) : null }),
      ...(isActive !== undefined && { isActive }),
      ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
    },
  });

  res.json({ promotion, message: 'Promotion updated successfully' });
});

// DELETE /api/promotions/:id (Admin)
const deletePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.storePromotion.delete({ where: { id } });
  res.json({ ok: true, message: 'Promotion removed' });
});

module.exports = {
  getPromotions,
  getAllPromotionsAdmin,
  createPromotion,
  updatePromotion,
  deletePromotion,
};
