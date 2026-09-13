const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const { sendValetConfirmation } = require('../config/mailer');

// POST /api/valet-bookings (Public)
const createValetBooking = asyncHandler(async (req, res) => {
  const { customerName, email, phone, vehicleReg, vehicleType, serviceTier, bookingDate, timeSlot, notes } = req.body;

  if (!customerName || !email || !phone || !vehicleReg || !serviceTier || !bookingDate || !timeSlot) {
    res.status(400);
    throw new Error('All booking fields (name, email, phone, vehicle reg, service, date, time) are required');
  }

  const booking = await prisma.valetBooking.create({
    data: {
      customerName,
      email,
      phone,
      vehicleReg: vehicleReg.toUpperCase().replace(/\s+/g, ' ').trim(),
      vehicleType: vehicleType || 'Hatchback/Saloon',
      serviceTier,
      bookingDate: new Date(bookingDate),
      timeSlot,
      notes: notes || null,
      status: 'PENDING',
    },
  });

  sendValetConfirmation(booking).catch((e) => console.error('Booking confirmation email error:', e));

  res.status(201).json({
    ok: true,
    message: 'Your valeting slot has been booked. A confirmation has been sent to your email.',
    booking,
  });
});

// GET /api/valet-bookings/admin (Admin)
const getValetBookingsAdmin = asyncHandler(async (req, res) => {
  const { status, date } = req.query;
  const bookings = await prisma.valetBooking.findMany({
    where: {
      ...(status && { status }),
      ...(date && {
        bookingDate: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lte: new Date(`${date}T23:59:59.999Z`),
        },
      }),
    },
    orderBy: { bookingDate: 'desc' },
  });
  res.json({ bookings });
});

// PUT /api/valet-bookings/:id/status (Admin)
const updateValetBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, price, notes } = req.body;

  const booking = await prisma.valetBooking.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(price !== undefined && { price }),
      ...(notes !== undefined && { notes }),
    },
  });

  res.json({ booking, message: 'Booking status updated' });
});

// DELETE /api/valet-bookings/:id (Admin)
const deleteValetBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await prisma.valetBooking.delete({ where: { id } });
  res.json({ ok: true, message: 'Booking deleted' });
});

module.exports = {
  createValetBooking,
  getValetBookingsAdmin,
  updateValetBookingStatus,
  deleteValetBooking,
};
