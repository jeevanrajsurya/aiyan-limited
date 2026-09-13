const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// GET /api/services (Public)
const getServices = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const services = await prisma.forecourtService.findMany({
    where: {
      isActive: true,
      ...(category && { category }),
    },
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ services });
});

// GET /api/services/admin (Admin)
const getAllServicesAdmin = asyncHandler(async (req, res) => {
  const services = await prisma.forecourtService.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  res.json({ services });
});

// GET /api/services/:slug
const getServiceBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await prisma.forecourtService.findUnique({ where: { slug } });
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }
  res.json({ service });
});

// POST /api/services (Admin)
const createService = asyncHandler(async (req, res) => {
  const { name, slug, category, icon, summary, description, features, badge, imageUrl, sortOrder } = req.body;

  if (!name || !slug || !summary) {
    res.status(400);
    throw new Error('Name, slug, and summary are required');
  }

  const service = await prisma.forecourtService.create({
    data: {
      name,
      slug,
      category: category || 'FUEL',
      icon: icon || 'Fuel',
      summary,
      description: description || null,
      features: features || [],
      badge: badge || null,
      imageUrl: imageUrl || null,
      sortOrder: Number(sortOrder) || 0,
    },
  });

  res.status(201).json({ service });
});

// PUT /api/services/:id (Admin)
const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, slug, category, icon, summary, description, features, badge, imageUrl, isActive, sortOrder } = req.body;

  const service = await prisma.forecourtService.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(category && { category }),
      ...(icon && { icon }),
      ...(summary && { summary }),
      ...(description !== undefined && { description }),
      ...(features !== undefined && { features }),
      ...(badge !== undefined && { badge }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(isActive !== undefined && { isActive }),
      ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
    },
  });

  res.json({ service, message: 'Service updated successfully' });
});

// DELETE /api/services/:id (Admin)
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.forecourtService.delete({ where: { id } });
  res.json({ ok: true, message: 'Service deleted' });
});

module.exports = {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
