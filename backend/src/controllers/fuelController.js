const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// GET /api/fuel-prices (Public)
const getFuelPrices = asyncHandler(async (req, res) => {
  const prices = await prisma.fuelPrice.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ fuelPrices: prices, lastUpdated: prices[0]?.updatedAt || new Date() });
});

// GET /api/fuel-prices/admin (Admin - includes inactive)
const getAllFuelPricesAdmin = asyncHandler(async (req, res) => {
  const prices = await prisma.fuelPrice.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ fuelPrices: prices });
});

// PUT /api/fuel-prices/:id (Admin update price/badge)
const updateFuelPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { pricePence, badge, isActive, sortOrder, gradeName, fuelType } = req.body;

  const updated = await prisma.fuelPrice.update({
    where: { id },
    data: {
      ...(pricePence !== undefined && { pricePence }),
      ...(badge !== undefined && { badge }),
      ...(isActive !== undefined && { isActive }),
      ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      ...(gradeName && { gradeName }),
      ...(fuelType && { fuelType }),
    },
  });

  res.json({ fuelPrice: updated, message: 'Fuel price updated successfully' });
});

// POST /api/fuel-prices (Admin add new grade)
const createFuelPrice = asyncHandler(async (req, res) => {
  const { gradeName, fuelType, pricePence, badge, sortOrder } = req.body;

  if (!gradeName || !fuelType || pricePence === undefined) {
    res.status(400);
    throw new Error('gradeName, fuelType, and pricePence are required');
  }

  const created = await prisma.fuelPrice.create({
    data: {
      gradeName,
      fuelType,
      pricePence,
      badge: badge || null,
      sortOrder: Number(sortOrder) || 0,
    },
  });

  res.status(201).json({ fuelPrice: created });
});

// DELETE /api/fuel-prices/:id (Admin delete)
const deleteFuelPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.fuelPrice.delete({ where: { id } });
  res.json({ ok: true, message: 'Fuel grade removed' });
});

module.exports = {
  getFuelPrices,
  getAllFuelPricesAdmin,
  updateFuelPrice,
  createFuelPrice,
  deleteFuelPrice,
};
