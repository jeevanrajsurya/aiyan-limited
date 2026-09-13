const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// POST /api/jobs/apply  (multipart/form-data, field name: resume)
const applyForJob = asyncHandler(async (req, res) => {
  const { name, email, phone, position } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error('Name and email are required');
  }

  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const application = await prisma.jobApplication.create({
    data: { name, email, phone, position, resumeUrl },
  });

  res.status(201).json({ application });
});

// GET /api/jobs — admin
const listApplications = asyncHandler(async (req, res) => {
  const applications = await prisma.jobApplication.findMany({
    orderBy: { submittedAt: 'desc' },
  });
  res.json({ applications });
});

// PATCH /api/jobs/:id/status — admin
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await prisma.jobApplication.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ application });
});

module.exports = { applyForJob, listApplications, updateApplicationStatus };
