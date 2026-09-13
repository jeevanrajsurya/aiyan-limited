const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');

// POST /api/orders  — customer places an order from their cart
// body: { items: [{ productId, quantity }] }
const createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;
  if (!items?.length) {
    res.status(400);
    throw new Error('Order must contain at least one item');
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
  });

  let total = 0;
  const orderItemsData = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    total += Number(product.price) * item.quantity;
    return { productId: product.id, quantity: item.quantity, price: product.price };
  });

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId: req.user.id,
        total,
        items: { create: orderItemsData },
      },
      include: { items: { include: { product: true } } },
    });

    // decrement stock
    for (const item of orderItemsData) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return newOrder;
  });

  res.status(201).json({ order });
});

// GET /api/orders/mine — logged-in customer's own orders
const myOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ orders });
});

// GET /api/orders — admin: all orders
const allOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ orders });
});

// PATCH /api/orders/:id/status — admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json({ order });
});

module.exports = { createOrder, myOrders, allOrders, updateOrderStatus };
