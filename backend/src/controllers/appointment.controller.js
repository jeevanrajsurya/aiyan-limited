const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// POST /api/appointments
const createAppointment = asyncHandler(async (req, res) => {
  const { serviceType, date, timeSlot, notes } = req.body;
  if (!serviceType || !date || !timeSlot) {
    res.status(400);
    throw new Error('serviceType, date and timeSlot are required');
  }
  const appointment = await prisma.appointment.create({
    data: { userId: req.user.id, serviceType, date: new Date(date), timeSlot, notes },
  });
  res.status(201).json({ appointment });
});

// GET /api/appointments/mine
const myAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { userId: req.user.id },
    orderBy: { date: 'asc' },
  });
  res.json({ appointments });
});

// GET /api/appointments — admin
const allAppointments = asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: { user: { select: { name: true, email: true, phone: true } } },
    orderBy: { date: 'asc' },
  });
  res.json({ appointments });
});

// PATCH /api/appointments/:id/status — admin
const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appointment = await prisma.appointment.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ appointment });
});

module.exports = { createAppointment, myAppointments, allAppointments, updateAppointmentStatus };
