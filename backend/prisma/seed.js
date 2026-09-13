const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. Admin Users
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@aiyanlimited.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.SEED_ADMIN_NAME || 'Aiyan Limited Admin';
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminPasswordHash, name: adminName },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      phone: '(281) 555-0199',
    },
  });

  // 2. Site Settings (CMS configuration)
  await prisma.siteSetting.upsert({
    where: { key: 'general' },
    update: {
      value: {
        stationName: 'S&B Conoco Forecourt & C-Store',
        tagline: 'Premier 24/7 US Fuel, Ultra-Rapid EV Charging & Convenience Forecourt',
        phone: '(281) 555-0199',
        emergencyPhone: '1-800-527-5476',
        email: 'contact@sb-conoco.com',
        fleetEmail: 'fleets@sb-conoco.com',
        address: '14205 Katy Freeway, Houston, TX',
        postcode: '77079',
        country: 'United States',
        vatNumber: 'EIN 47-8291045',
        companyReg: 'US-TX-882914',
        forecourtHours: 'Open 24 Hours / 7 Days a Week',
        storeHours: 'Open 24/7 / 365 Days',
        jetWashHours: '06:00 AM - 10:00 PM Daily',
        googleMapsUrl: 'https://maps.google.com/?q=14205+Katy+Freeway,+Houston,+TX+77079',
        noticeBanner: {
          enabled: true,
          text: '⚡ NEW: 150kW Ultra-Rapid Dual EV Charging Hub & Touchless Soft-Cloth Car Wash now open!',
          badge: 'Forecourt Update',
        },
      },
    },
    create: {
      key: 'general',
      value: {
        stationName: 'S&B Conoco Forecourt & C-Store',
        tagline: 'Premier 24/7 US Fuel, Ultra-Rapid EV Charging & Convenience Forecourt',
        phone: '(281) 555-0199',
        emergencyPhone: '1-800-527-5476',
        email: 'contact@sb-conoco.com',
        fleetEmail: 'fleets@sb-conoco.com',
        address: '14205 Katy Freeway, Houston, TX',
        postcode: '77079',
        country: 'United States',
        vatNumber: 'EIN 47-8291045',
        companyReg: 'US-TX-882914',
        forecourtHours: 'Open 24 Hours / 7 Days a Week',
        storeHours: 'Open 24/7 / 365 Days',
        jetWashHours: '06:00 AM - 10:00 PM Daily',
        googleMapsUrl: 'https://maps.google.com/?q=14205+Katy+Freeway,+Houston,+TX+77079',
        noticeBanner: {
          enabled: true,
          text: '⚡ NEW: 150kW Ultra-Rapid Dual EV Charging Hub & Touchless Soft-Cloth Car Wash now open!',
          badge: 'Forecourt Update',
        },
      },
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: 'hero' },
    update: {
      value: {
        headline: 'The app that lets you SAVE SAVE SAVE.',
        subheadline:
          'Fuel up with Top Tier™ Conoco gasoline, grab barista-brewed coffee and fresh deli bites, and save up to 25¢/gal with the Fuel Forward® app.',
        stats: [
          { label: 'Forecourt Access', value: '24/7 / 365 Days' },
          { label: 'EV Charging Speed', value: 'Up to 150 kW' },
          { label: 'Fuel Standard', value: 'Top Tier™ Certified' },
          { label: 'Commercial Fleets', value: '350+ Accounts' },
        ],
      },
    },
    create: {
      key: 'hero',
      value: {
        headline: 'The app that lets you SAVE SAVE SAVE.',
        subheadline:
          'Fuel up with Top Tier™ Conoco gasoline, grab barista-brewed coffee and fresh deli bites, and save up to 25¢/gal with the Fuel Forward® app.',
        stats: [
          { label: 'Forecourt Access', value: '24/7 / 365 Days' },
          { label: 'EV Charging Speed', value: 'Up to 150 kW' },
          { label: 'Fuel Standard', value: 'Top Tier™ Certified' },
          { label: 'Commercial Fleets', value: '350+ Accounts' },
        ],
      },
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: 'contact_page_cms' },
    update: {
      value: {
        hero: {
          title: 'Contact Us',
          subtitle: "Your car knows and we'd like to know too. Drop us a line below.",
          badge: 'Customer Care & Support',
        },
        topics: [
          'Personnel & service',
          'Station facility & equipment',
          'ADA related',
          'Fuel quality',
          'Credit card & Fuel cards',
          'Kickback & Forecourt points',
          'Promotions & Offers',
          'Pricing',
          'Mobile App',
          'Visitor Feedback Survey',
          'Other',
        ],
        twoColumnCards: [
          {
            id: '1',
            title: 'Conoco® Credit Card Inquiries.',
            description: 'For questions regarding Conoco® personal credit cards, please call: 1-855-513-1176.',
            phone: '1-855-513-1176',
            imageUrl: 'https://phillips66.widen.net/content/inihlwr22p/jpeg/P66-1129-Credit-Card-Navigation_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
            buttonText: 'Learn more',
            buttonLink: '/fleet',
          },
          {
            id: '2',
            title: 'KickBack® Rewards Inquiries',
            description: 'Get rewarded for every mile. Earn points on top of savings with a KickBack® Rewards Card.',
            phone: '',
            imageUrl: 'https://phillips66.widen.net/content/nacz2a8eto/jpeg/P66-1129%20Kickback%20Tile_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
            buttonText: 'Kickback® email form',
            buttonLink: 'https://kickbackpoints.com/contact-us/',
          },
        ],
        bentoCards: [
          {
            id: '1',
            title: 'Customer service department',
            lines: [
              'Available Monday – Friday',
              '8 a.m.-5 p.m. Central Time',
              '1-800-527-5476',
            ],
            phone: '1-800-527-5476',
          },
          {
            id: '2',
            title: 'Mailing address',
            lines: [
              'Consumer Services Department',
              'P.O. Box 7200',
              'Bartlesville, OK 74005',
            ],
            phone: '',
          },
          {
            id: '3',
            title: 'Interested in growing with us?',
            lines: [
              'To find out information on how you can become a marketer or reseller, check out our Conoco® Fuel Supplier Website.',
            ],
            linkText: 'Conoco® Fuel Supplier Website.',
            linkUrl: 'http://www.phillips66fuelsupplier.com/',
          },
        ],
        formSettings: {
          optInText: 'Sign up for email updates from Phillips 66® and a chance to win $500 in promo items and fuel cards each quarter.',
          disclaimerText: 'By clicking the SUBMIT button you agree to the Privacy Statement and Terms & Conditions.',
        },
      },
    },
    create: {
      key: 'contact_page_cms',
      value: {
        hero: {
          title: 'Contact Us',
          subtitle: "Your car knows and we'd like to know too. Drop us a line below.",
          badge: '',
        },
        topics: [
          'Personnel & service',
          'Station facility & equipment',
          'ADA related',
          'Fuel quality',
          'Credit card',
          'Kickback points',
          'Promotions',
          'Fraud',
          'Pricing',
          'Mobile App',
          'Visitor Barometer Web Survey',
          'Other',
        ],
        twoColumnCards: [
          {
            id: '1',
            title: 'Conoco® Credit Card Inquiries.',
            description: 'For questions regarding Conoco® personal credit cards, please call: 1-855-513-1176.',
            phone: '1-855-513-1176',
            imageUrl: 'https://phillips66.widen.net/content/inihlwr22p/jpeg/P66-1129-Credit-Card-Navigation_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
            buttonText: 'Learn more',
            buttonLink: '/fleet',
          },
          {
            id: '2',
            title: 'KickBack® Rewards Inquiries',
            description: 'Get rewarded for every mile. Earn points on top of savings with a KickBack® Rewards Card.',
            phone: '',
            imageUrl: 'https://phillips66.widen.net/content/nacz2a8eto/jpeg/P66-1129%20Kickback%20Tile_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
            buttonText: 'Kickback® email form',
            buttonLink: 'https://kickbackpoints.com/contact-us/',
          },
        ],
        bentoCards: [
          {
            id: '1',
            title: 'Customer service department',
            lines: [
              'Available Monday – Friday',
              '8 a.m.-5 p.m. Central Time',
              '1-800-527-5476',
            ],
            phone: '1-800-527-5476',
          },
          {
            id: '2',
            title: 'Mailing address',
            lines: [
              'Consumer Services Department',
              'P.O. Box 7200',
              'Bartlesville, OK 74005',
            ],
            phone: '',
          },
          {
            id: '3',
            title: 'Interested in growing with us?',
            lines: [
              'To find out information on how you can become a marketer or reseller, check out our Conoco® Fuel Supplier Website.',
            ],
            linkText: 'Conoco® Fuel Supplier Website.',
            linkUrl: 'http://www.phillips66fuelsupplier.com/',
          },
        ],
        formSettings: {
          optInText: 'Sign up for email updates from Phillips 66® and a chance to win $500 in promo items and fuel cards each quarter.',
          disclaimerText: 'By clicking the SUBMIT button you agree to the Privacy Statement and Terms & Conditions.',
        },
      },
    },
  });

  // 3. Live Fuel Prices (US Forecourt Standards in USD $/gal)
  const fuelGrades = [
    {
      gradeName: 'Regular Unleaded (87 Octane)',
      fuelType: 'Petrol',
      pricePence: 3.19,
      badge: 'Top Tier™ Gasoline',
      sortOrder: 1,
    },
    {
      gradeName: 'Plus Midgrade (89 Octane)',
      fuelType: 'Petrol',
      pricePence: 3.49,
      badge: 'Extra Cleaning Detergents',
      sortOrder: 2,
    },
    {
      gradeName: 'Premium Unleaded (93 Octane)',
      fuelType: 'Petrol',
      pricePence: 3.89,
      badge: '3X Detergent Engine Shield',
      sortOrder: 3,
    },
    {
      gradeName: 'Ultra-Low Sulfur Diesel #2',
      fuelType: 'Diesel',
      pricePence: 3.79,
      badge: 'High Cetane & Clean Injectors',
      sortOrder: 4,
    },
    {
      gradeName: 'DEF at the Pump',
      fuelType: 'Additives',
      pricePence: 2.89,
      badge: 'Bulk Dispenser Nozzle',
      sortOrder: 5,
    },
    {
      gradeName: '150kW DC Fast EV Charging',
      fuelType: 'LPG',
      pricePence: 0.38,
      badge: 'CCS & NACS Connectors',
      sortOrder: 6,
    },
  ];

  // Clear old fuel grades to remove legacy UK grades
  await prisma.fuelPrice.deleteMany({});
  for (const grade of fuelGrades) {
    await prisma.fuelPrice.create({ data: grade });
  }

  // 4. Forecourt Services
  const services = [
    {
      name: 'Top Tier™ Fuel Forecourt & Contactless Pay-at-Pump',
      slug: 'multi-fuel-forecourt',
      category: 'FUEL',
      icon: 'Fuel',
      summary: 'High-speed pumps dispensing Regular 87, Plus 89, Premium 93, Diesel #2, and DEF.',
      badge: '24/7 Access',
      sortOrder: 1,
      features: [
        'Contactless pay-at-the-pump with Apple Pay, Google Pay, and Fuel Forward®',
        'High-flow commercial satellite diesel dispensers for Class 6-8 trucks',
        'Bulk Diesel Exhaust Fluid (DEF) nozzles right on commercial islands',
        'Universal acceptance of major US Fleet Cards (WEX, Voyager, Fuelman)',
      ],
    },
    {
      name: '150kW Ultra-Rapid EV Fast Charging Hub',
      slug: 'ev-charging-hub',
      category: 'EV_CHARGING',
      icon: 'Zap',
      summary: 'Dual DC fast chargers delivering 20% to 80% battery capacity in under 20 minutes.',
      badge: '150kW CCS & NACS',
      sortOrder: 2,
      features: [
        'Universal CCS1 and Tesla/NACS compatible charging ports',
        'Direct credit/debit card tap to charge — no membership app required',
        'Illuminated weather-protected canopy bays with security surveillance',
        'Convenient forecourt access steps away from fresh coffee and restrooms',
      ],
    },
    {
      name: 'Soft-Cloth Touchless Car Wash & Detail Island',
      slug: 'jet-wash-valet',
      category: 'CAR_CARE',
      icon: 'Sparkles',
      summary: 'Multi-stage contour wash with tri-color foam polish, ceramic wax shine, and high-power vacuums.',
      badge: 'Ceramic Shield Wax',
      sortOrder: 3,
      features: [
        'High-pressure undercarriage wash and rust inhibitor coating',
        'Tri-color conditioning foam with Carnauba shine and ceramic seal',
        'Commercial dual-motor high-suction vacuums and tire shine station',
        'Digital tire pressure air tower with automated PSI calibration',
      ],
    },
    {
      name: 'Conoco Convenience Store & Artisan Deli',
      slug: 'convenience-store',
      category: 'CONVENIENCE_STORE',
      icon: 'ShoppingBag',
      summary: '100% Arabica bean-to-cup fresh coffee, artisan breakfast bakery, iced drinks, and hot deli subs.',
      badge: 'Open 24/7',
      sortOrder: 4,
      features: [
        'Barista-style bean-to-cup coffee bar with flavored syrups and creamers',
        'Fresh daily hot deli: warm breakfast burritos, artisan sandwiches, pizza',
        'Sub-zero Beer Cave and mega chilled fountain drink station (32+ flavors)',
        'ATM cash withdrawal, lotto terminal, ice bags, and road trip essentials',
      ],
    },
    {
      name: 'Blue Rhino® Propane Tank Exchange & Forecourt Care',
      slug: 'calor-gas-supply',
      category: 'AMENITIES',
      icon: 'Flame',
      summary: 'Precision-filled 20lb propane cylinders, firewood bundles, motor oil, and ice bags.',
      badge: 'Propane Exchange',
      sortOrder: 5,
      features: [
        'Fast 20lb Blue Rhino® propane cylinder exchange and purchase',
        'Emergency roadside fluids: synthetic motor oils, DEF jugs, wiper fluid',
        'Seasoned firewood bundles, charcoal, and Yeti ice bags for campers',
        'Clean restrooms forecourt guarantee with touch-free dispensers',
      ],
    },
  ];

  await prisma.forecourtService.deleteMany({});
  for (const s of services) {
    await prisma.forecourtService.create({ data: s });
  }

  // 5. Store Promotions & Forecourt Deals (USD Pricing)
  const promotions = [
    {
      title: 'Morning Fuel-Up: Coffee + Warm Pastry Combo',
      category: 'Food to Go',
      description: 'Any large bean-to-cup Arabica coffee paired with a freshly baked muffin, donut, or breakfast croissant.',
      priceText: '$3.99 Combo',
      discountBadge: 'Breakfast Deal',
      sortOrder: 1,
    },
    {
      title: 'Forecourt Deli Lunch Meal Deal',
      category: 'Food to Go',
      description: 'Freshly prepared 6-inch artisan sub or salad + 20oz fountain drink + premium kettle chips.',
      priceText: '$6.49 Meal Deal',
      discountBadge: 'Customer Favorite',
      sortOrder: 2,
    },
    {
      title: 'Energy Drink Rush: 2 for $5.00',
      category: 'Snacks & Drinks',
      description: 'Mix & Match any two Red Bull (12oz), Monster Energy (16oz), or Celsius Sparkling cans.',
      priceText: '2 for $5.00',
      discountBadge: 'Save $1.98',
      sortOrder: 3,
    },
    {
      title: 'All-Season Windshield Washer Fluid (-20°F)',
      category: 'Car Care',
      description: 'Streak-free bug and grime dissolving formula with freeze protection down to -20°F.',
      priceText: '$3.49 / 2 for $6',
      discountBadge: 'Travel Essential',
      sortOrder: 4,
    },
  ];

  await prisma.storePromotion.deleteMany({});
  for (const promo of promotions) {
    await prisma.storePromotion.create({ data: promo });
  }

  // 6. Sample B2B Commercial Fleet Inquiry
  await prisma.inquiry.deleteMany({});
  await prisma.inquiry.create({
    data: {
      name: 'Marcus Vance',
      email: 'm.vance@houstonlogistics.com',
      phone: '(281) 555-0144',
      companyName: 'Houston Heavy Transport LLC',
      fleetSize: '15 Commercial Box Trucks & Pickups',
      inquiryType: 'FLEET_FUEL_CARD',
      subject: 'Inquiry for Monthly Commercial Fleet Account & Tax Invoicing',
      message:
        'We operate a fleet of 15 commercial diesel vehicles across Houston and Katy Freeway daily. We would like to open a commercial fleet account with itemized Level 3 monthly invoicing and volume fuel rebates.',
      status: 'NEW',
    },
  });

  console.log('✅ S&B Conoco Forecourt Database Seeded Successfully!');
  console.log(`👤 Admin Account: ${adminEmail} (Role: ADMIN)`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

