const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const { sendAdminLeadAlert, sendCustomerAutoResponder } = require('../config/mailer');

// POST /api/inquiries (Public - Submit Contact / B2B Fuel Card / Supply Inquiry)
const createInquiry = asyncHandler(async (req, res) => {
  const {
    name,
    firstName,
    lastName,
    email,
    phone,
    companyName,
    fleetSize,
    inquiryType,
    topic,
    subject,
    message,
    zipCode,
    stationSpecific,
    station,
    optInNewsletter,
  } = req.body;

  const fullName = name || [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous';

  if (!fullName.trim() || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required');
  }

  const validTypes = ['GENERAL', 'FLEET_FUEL_CARD', 'COMMERCIAL_SUPPLY', 'VALET_SERVICE', 'COMPLAINT'];
  let mappedType = 'GENERAL';
  if (inquiryType === 'COMMERCIAL_FLEET' || inquiryType === 'FLEET_FUEL_CARD') {
    mappedType = 'FLEET_FUEL_CARD';
  } else if (inquiryType === 'CAR_CARE' || inquiryType === 'VALET_SERVICE') {
    mappedType = 'VALET_SERVICE';
  } else if (validTypes.includes(inquiryType)) {
    mappedType = inquiryType;
  }

  const generatedSubject = subject || (topic ? `[${topic}] Inquiry` : 'Contact Form Submission');
  
  // Format metadata for internal notes
  const metaParts = [];
  if (topic) metaParts.push(`Topic: ${topic}`);
  if (stationSpecific) metaParts.push(`Station Specific: ${stationSpecific}${station ? ` (${station})` : ''}`);
  if (zipCode) metaParts.push(`Postal/Zip: ${zipCode}`);
  if (optInNewsletter) metaParts.push(`Newsletter Opt-in: Yes`);
  const initialNotes = metaParts.length > 0 ? metaParts.join(' | ') : null;

  const inquiry = await prisma.inquiry.create({
    data: {
      name: fullName,
      email,
      phone: phone || null,
      companyName: companyName || null,
      fleetSize: fleetSize || null,
      inquiryType: mappedType,
      subject: generatedSubject,
      message,
      notes: initialNotes,
      status: 'NEW',
    },
  });

  // Dual Email Dispatch asynchronously
  sendAdminLeadAlert(inquiry).catch((e) => console.error('Admin alert failed:', e));
  sendCustomerAutoResponder(inquiry).catch((e) => console.error('Auto-responder failed:', e));

  res.status(201).json({
    ok: true,
    message: 'Your inquiry has been received. Our team will contact you shortly.',
    inquiry: { id: inquiry.id },
  });
});

// GET /api/inquiries/admin (Admin - View CRM leads)
const getInquiriesAdmin = asyncHandler(async (req, res) => {
  const { status, inquiryType } = req.query;
  const inquiries = await prisma.inquiry.findMany({
    where: {
      ...(status && { status }),
      ...(inquiryType && { inquiryType }),
    },
    orderBy: { submittedAt: 'desc' },
  });
  res.json({ inquiries });
});

// PUT /api/inquiries/:id/status (Admin - Update status / internal notes)
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, isRead, notes } = req.body;

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(isRead !== undefined && { isRead }),
      ...(notes !== undefined && { notes }),
    },
  });

  res.json({ inquiry, message: 'Inquiry updated' });
});

// DELETE /api/inquiries/:id (Admin)
const deleteInquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.inquiry.delete({ where: { id } });
  res.json({ ok: true, message: 'Inquiry deleted' });
});

module.exports = {
  createInquiry,
  getInquiriesAdmin,
  updateInquiryStatus,
  deleteInquiry,
};
