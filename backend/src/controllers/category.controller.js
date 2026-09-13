const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

const listCategories = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json({ categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body;
  const category = await prisma.category.create({ data: { name, slug } });
  res.status(201).json({ category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

module.exports = { listCategories, createCategory, deleteCategory };
