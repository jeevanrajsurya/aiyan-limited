const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function upsertAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@aiyanlimited.com';
  const password = process.env.ADMIN_PASSWORD;

  if (!password || !password.trim()) {
    console.error('❌ Error: ADMIN_PASSWORD environment variable is required.');
    process.exit(1);
  }

  // 1. Hash password using the project's standard 10 salt rounds
  const passwordHash = await bcrypt.hash(password.trim(), 10);

  // 2. Non-destructive Prisma upsert targeting ONLY this single email
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'ADMIN',
      name: process.env.ADMIN_NAME || 'Aiyan Limited Admin',
    },
    create: {
      email,
      name: process.env.ADMIN_NAME || 'Aiyan Limited Admin',
      passwordHash,
      role: 'ADMIN',
      phone: process.env.ADMIN_PHONE || '(281) 555-0199',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  console.log(`✅ [Success] Admin user ready: ${user.email} (Role: ${user.role}, ID: ${user.id})`);
}

upsertAdmin()
  .catch((err) => {
    console.error('❌ [Error] Upsert failed:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
