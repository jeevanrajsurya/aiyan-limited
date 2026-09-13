const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// POST /api/jobs/apply (Public)
const submitApplication = asyncHandler(async (req, res) => {
  const { name, email, phone, position, experience, availability, coverNote } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!name || !email || !phone || !position) {
    res.status(400);
    throw new Error('Name, email, phone, and position are required');
  }

  const application = await prisma.jobApplication.create({
    data: {
      name,
      email,
      phone,
      position,
      experience: experience || null,
      availability: availability || null,
      coverNote: coverNote || null,
      resumeUrl,
      status: 'RECEIVED',
    },
  });

  res.status(201).json({
    ok: true,
    message: 'Application submitted successfully. Our hiring manager will review your application.',
    application: { id: application.id },
  });
});

// GET /api/jobs/admin (Admin)
const getApplicationsAdmin = asyncHandler(async (req, res) => {
  const { status, position } = req.query;
  const applications = await prisma.jobApplication.findMany({
    where: {
      ...(status && { status }),
      ...(position && { position }),
    },
    orderBy: { submittedAt: 'desc' },
  });
  res.json({ applications });
});

// PUT /api/jobs/:id/status (Admin)
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await prisma.jobApplication.update({
    where: { id },
    data: { status },
  });

  res.json({ application, message: 'Application status updated' });
});

// DELETE /api/jobs/:id (Admin)
const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.jobApplication.delete({ where: { id } });
  res.json({ ok: true, message: 'Application deleted' });
});

module.exports = {
  submitApplication,
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
};
