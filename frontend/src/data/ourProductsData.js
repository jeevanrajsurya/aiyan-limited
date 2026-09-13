// Fallback data for S&B Retail Our Products Hub matching Database CMS 1-to-1

export const fallbackOurProductsCms = {
  hub: {
    hero: {
      enabled: true,
      headlineLine1: 'Quality You Can Taste & Trust.',
      headlineLine2: 'Artisan Coffee, Fresh Bakery & Everyday Essentials.',
      buttonText: 'Explore In-Store Range',
      buttonLink: '#products',
      bgMediaUrl: '/uploads/1789127169752-947061930.jpeg',
      bgMediaType: 'image',
      badgeText: '',
      title: 'Our Products',
      subtitle: '',
      textColor: 'white',
      overlayStyle: 'gradient',
    },
    intro: {
      enabled: true,
      headline:
        'We carry beverages fit for energizing, satisfying, warming up, cooling down or just plain quenching your thirst',
      body:
        'We’ve got your food solutions, too - whether it’s for on-the-go, at work or anywhere in-between… treat time, lunch time, anytime! We’ll supply the everyday necessities for your fridge, your family, your first aid kit or your traveling tool box. ',
    },
    actionCardsEnabled: true,
    actionCards: [
      {
        id: 'card-thirst-stop',
        title: "America's\nTHIRST STOP!",
        subtitle:
          'Ice-cold fountain drinks, fresh barista coffee, froster slushies and ready-to-grab cold teas and juices.',
        imageUrl: '/uploads/1789127192911-294088960.png',
        cardTheme: 'blue',
        linkUrl: '/our-products/americas-thirst-stop',
        buttonText: 'More info →',
        badge: 'Drinks & Beverages',
        showDash: true,
        enabled: true,
      },
      {
        id: 'card-fresh-food',
        title: 'Fresh food,\nfast!',
        subtitle:
          'We’re the hot spot for tasty snacks and meals on the move. From hot dogs, artisan pizza, to sandwiches and salads, we’ve got your hunger covered.',
        imageUrl: '/uploads/1789127201534-508361486.jpeg',
        cardTheme: 'green',
        linkUrl: '/our-products/meal-deals',
        buttonText: 'More info →',
        badge: 'Hot Foods & Combos',
        showDash: true,
        enabled: true,
      },
      {
        id: 'card-easy-pay',
        title: 'Easy Pay',
        subtitle:
          'Easy to Save, Easy to Pay, Every Day, on Every Gallon! Link your S&B Easy Pay card to your checking account for the most secure, convenient way to fuel up and save up to 30¢/gal.',
        imageUrl: '/uploads/1789127209953-470831119.jpeg',
        cardTheme: 'white',
        linkUrl: '/our-products/easy-pay',
        buttonText: 'Read more →',
        badge: 'Save 30¢/gal',
        showDash: true,
        enabled: true,
      },
      {
        id: 'card-fleet',
        title: 'Fleet Card',
        subtitle:
          'Empower your commercial fleet with centralized fuel management, driver PIN security, monthly consolidated invoicing and tiered volume savings.',
        imageUrl: '/uploads/1789127220920-40195423.jpeg',
        cardTheme: 'white',
        linkUrl: '/our-products/business',
        buttonText: 'More info →',
        badge: 'B2B Solutions',
        showDash: true,
        enabled: true,
      },
      {
        id: 'card-quality-guaranteed',
        title: 'Quality\nguaranteed',
        subtitle:
          'When we say quality guaranteed fuel, we mean it. Top Tier™ detergent gasoline that cleans intake valves, protects engines, and enhances every mile.',
        imageUrl: '/uploads/1789127233213-279730124.jpeg',
        cardTheme: 'slate',
        linkUrl: '/our-products/qualityguaranteed',
        buttonText: 'More info →',
        badge: 'Top Tier™ Fuel',
        showDash: true,
        enabled: true,
      },
    ],
  },
};
