const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const { randomUUID } = require('crypto');

let tableInitialized = false;
async function ensureNewsletterTable() {
  if (tableInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS newsletter_submissions (
        id VARCHAR(64) PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        zip VARCHAR(50),
        position VARCHAR(255),
        resume_url TEXT,
        status VARCHAR(50) DEFAULT 'NEW',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    // Ensure position column exists if table was created previously
    await prisma.$executeRawUnsafe(`
      ALTER TABLE newsletter_submissions ADD COLUMN IF NOT EXISTS position VARCHAR(255);
    `);
    tableInitialized = true;
  } catch (err) {
    console.error('Failed to initialize newsletter_submissions table:', err.message);
  }
}

// POST /api/newsletter/subscribe (Public)
const subscribeNewsletter = asyncHandler(async (req, res) => {
  await ensureNewsletterTable();
  const { firstName, lastName, email, phone, zip, position } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!firstName || !firstName.trim()) {
    res.status(400);
    throw new Error('First name is required');
  }
  if (!email || !email.trim()) {
    res.status(400);
    throw new Error('Email address is required');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400);
    throw new Error('Please enter a valid email address');
  }
  if (!phone || !phone.trim()) {
    res.status(400);
    throw new Error('Mobile number is required');
  }

  const id = randomUUID();

  await prisma.$executeRawUnsafe(
    `INSERT INTO newsletter_submissions (id, first_name, last_name, email, phone, zip, position, resume_url, status, submitted_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'NEW', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    id,
    firstName.trim(),
    lastName ? lastName.trim() : null,
    email.trim().toLowerCase(),
    phone.trim(),
    zip ? zip.trim() : null,
    position ? position.trim() : null,
    resumeUrl
  );

  res.status(201).json({
    ok: true,
    message: 'Thank you for subscribing! Your details and resume have been received.',
    submission: { id, firstName, email, phone, position, resumeUrl },
  });
});

// GET /api/newsletter/admin (Admin CRM)
const getSubmissionsAdmin = asyncHandler(async (req, res) => {
  await ensureNewsletterTable();
  const { status, search } = req.query;

  let query = 'SELECT * FROM newsletter_submissions';
  const conditions = [];
  const params = [];

  if (status && status !== 'ALL') {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  if (search && search.trim()) {
    params.push(`%${search.trim().toLowerCase()}%`);
    const sIndex = params.length;
    conditions.push(`(
      LOWER(first_name) LIKE $${sIndex} OR
      LOWER(COALESCE(last_name, '')) LIKE $${sIndex} OR
      LOWER(email) LIKE $${sIndex} OR
      LOWER(COALESCE(phone, '')) LIKE $${sIndex} OR
      LOWER(COALESCE(zip, '')) LIKE $${sIndex} OR
      LOWER(COALESCE(position, '')) LIKE $${sIndex}
    )`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY submitted_at DESC';

  const rows = await prisma.$queryRawUnsafe(query, ...params);

  const formatted = rows.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    zip: row.zip,
    position: row.position,
    resumeUrl: row.resume_url,
    status: row.status,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  }));

  res.json({ submissions: formatted });
});

// PUT /api/newsletter/:id/status (Admin)
const updateSubmissionStatus = asyncHandler(async (req, res) => {
  await ensureNewsletterTable();
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error('Status is required');
  }

  await prisma.$executeRawUnsafe(
    'UPDATE newsletter_submissions SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
    status,
    id
  );

  res.json({ ok: true, message: 'Submission status updated successfully' });
});

// DELETE /api/newsletter/:id (Admin)
const deleteSubmission = asyncHandler(async (req, res) => {
  await ensureNewsletterTable();
  const { id } = req.params;

  await prisma.$executeRawUnsafe(
    'DELETE FROM newsletter_submissions WHERE id = $1',
    id
  );

  res.json({ ok: true, message: 'Submission record deleted successfully' });
});

module.exports = {
  subscribeNewsletter,
  getSubmissionsAdmin,
  updateSubmissionStatus,
  deleteSubmission,
};
