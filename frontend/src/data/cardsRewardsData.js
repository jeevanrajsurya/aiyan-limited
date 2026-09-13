// S&B Retail Cards & Rewards Complete Fallback CMS Data
// Strictly adhering to S&B Classic Petrol & Diesel theme (#005F73, #0A9396, #D97706, #071E26)

export const fallbackCardsRewardsCms = {
  hub: {
    hero: {
      title: 'Cards & Rewards',
      subtitle: 'Explore our suite of cards and rewards to make the most of every mile.',
      badgeText: 'CARDS & REWARDSs',
      bgMediaUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80',
      bgMediaType: 'image',
      overlayStyle: 'gradient',
    },
    intro: {
      headline: 'Fuel savings, premium rewards and seamless fleet management in your pocket.',
      body: 'Whether you are an everyday driver looking to save at every fill-up, a family earning instant rewards, or a commercial fleet manager optimizing fuel costs and route efficiency, S&B Retail offers tailored payment and rewards solutions designed for modern mobility.',
    },
    actionCards: [
      {
        id: 'credit-cards',
        title: 'Credit Cards',
        subtitle: 'Personal, Commercial & Fleet credit cards designed for every car and driver.',
        to: '/credit-cards',
        buttonText: 'Explore Credit Cards',
        imageUrl: 'https://phillips66.widen.net/content/7pv15t7doa/png/new-cc-p66-card.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
        theme: 'petrol', // Petrol card
        tag: 'Everyday Savings',
      },
      {
        id: 'kickback',
        title: 'KickBack® Rewards',
        subtitle: 'Earn points on everyday fuel & store purchases, then spend them like cash at participating pumps.',
        to: '/kickback',
        buttonText: 'Join KickBack®',
        imageUrl: 'https://phillips66.widen.net/content/sebzu6tx2p/jpeg/kickback-hero-01.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
        theme: 'slate', // Dark slate card
        tag: 'Loyalty Points',
      },
      {
        id: 'gift-cards',
        title: 'Gift Cards',
        subtitle: 'The perfect gift for family, friends, and coworkers. Denominations from $5 to $500.',
        to: '/gift-cards',
        buttonText: 'Buy Gift Cards',
        imageUrl: 'https://phillips66.widen.net/content/ka6jknjdl7/jpeg/SV2300164_Front%20%28002%29.jpeg?w=640&keep=c&crop=yes&color=cccccc&quality=80&u=u6q5cu',
        theme: 'white', // Clean card
        tag: 'Flexible Values',
      },
    ],
  },

  navDropdown: {
    badgeText: 'Cards & Rewards',
    title: 'Cards & Rewards',
    description: 'Explore our suite of cards and rewards to make the most of every mile.',
    cardImage: 'https://phillips66.widen.net/content/c5qqgh5vil/jpeg/BrandedFuelCardPrograms_CommercialCreditCard.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
    links: [
      { label: 'Credit Cards', to: '/credit-cards' },
      { label: 'KickBack® Rewards', to: '/kickback' },
      { label: 'Gift Cards', to: '/gift-cards' },
    ],
  },

  creditCards: {
    hero: {
      headline: 'There’s a card for every car (and driver).',
      subtitle: 'Unlock rewards with S&B Retail fuel credit cards—compare options and apply today to start earning on every fill-up!',
      bgMediaUrl: 'https://phillips66.widen.net/content/1ppdmpdyf8/jpeg/Hero%20Credit%20Card.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
      bgMediaType: 'image',
    },
    cards: [
      {
        id: 'personal-card',
        title: 'Boost your Rewards with the S&B Retail Credit Card',
        paragraphs: [
          'As a Cardholder you will now be able earn 3¢ on every fuel purchase when you swipe your card to pay or save 5¢ per gallon in Rewards when you pay with your S&B Retail Credit Card through the mobile app. Plus, stack your Rewards with featured seasonal mobile app offers.',
          'Make Car Care Extra Rewarding! Use your card at over 1 million auto merchant locations nationwide including parts, repair, services and more. 6 Months Promotional Financing is available on purchases of $199 or more. Plus, EMV chip for enhanced security transactions and peace of mind.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/7pv15t7doa/png/new-cc-p66-card.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
        imagePosition: 'right',
        primaryCta: { label: 'Apply now', link: 'https://apply.syf.com/eapply/eapply.action?clientCode=PHILLIPS66' },
        secondaryCta: { label: 'Manage account', link: 'https://www.mysynchrony.com/cmp-index.html?market=automotive&store=phillips_66_credit_card_rewards_program' },
      },
      {
        id: 'commercial-card',
        title: 'Meet the new S&B Retail Commercial Credit Card',
        paragraphs: [
          'Designed to help steer your business in the right direction, the new S&B Retail Commercial Credit Card is packed with business-friendly benefits. Enjoy pay-at-the-pump convenience at thousands of stations nationwide, detailed monthly statements and online account management.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/mqt2hblsrk/png/P66-Commercial-Card-Old-Design.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
        imagePosition: 'left',
        primaryCta: { label: 'Apply now', link: 'https://businessapply.syf.com/cmlapply/ca/p66brc/business-info' },
        secondaryCta: { label: 'Manage account', link: 'https://www.mysynchrony.com/cmp-index.html?market=automotive&store=phillips_66_credit_card_rewards_program' },
      },
      {
        id: 'fleet-card',
        title: 'S&B Retail Fleet Card',
        paragraphs: [
          'No matter how many vehicles you have to fill up, the S&B Retail Fleet Card is there to make it easier. With volume rebates up to 7¢ per gallon, this card program has robust reporting, online account management and tax-exemption capabilities. To apply, please call 1-877-685-0330 or click the button below.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/gd1kuxv6k5/png/PC71_PSX_PL-%281%29.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
        imagePosition: 'right',
        primaryCta: { label: 'Apply now', link: 'https://www.phillips66fleet.com/' },
        secondaryCta: { label: 'Manage account', link: 'https://p66.wexonline.com/login' },
      },
      {
        id: 'universal-card',
        title: 'S&B Retail Universal Card',
        paragraphs: [
          'We know you can’t always fill up at an S&B Retail station. That’s why we’ve created the S&B Retail Universal Card, accepted at 95% of U.S. retail fuel locations and 45,000 service locations nationwide – anywhere WEX® is accepted. To apply, please call 1-877-685-0330 or click the button below.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/m6n9nqkhgq/png/PC7U_PSX_U-%283%29.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
        imagePosition: 'left',
        primaryCta: { label: 'Apply now', link: 'https://www.phillips66fleet.com/' },
        secondaryCta: { label: 'Manage account', link: 'https://p66.wexonline.com/login' },
      },
    ],
  },

  kickback: {
    hero: {
      headline: 'Treat yourself and your car',
      subtitle: 'With the KickBack® points card, You can earn points on typical purchases, then spend your points like cash at any of our participating locations.',
      bgMediaUrl: 'https://phillips66.widen.net/content/sebzu6tx2p/jpeg/kickback-hero-01.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
      bgMediaType: 'image',
      primaryCta: { label: 'Register your card', link: 'https://kickbackpoints.com/my-account/' },
      secondaryCta: { label: 'Manage account', link: 'https://kickbackpoints.com/my-account/' },
    },
    howItWorks: {
      headline: 'How it works',
      steps: [
        {
          number: '01',
          title: 'Enroll',
          description: 'Pick up a FREE KickBack® Points card at participating locations or register for a digital card through the mobile app.',
        },
        {
          number: '02',
          title: 'Earn',
          description: 'Earn KickBack® Points on eligible purchases at participating locations when you present your physical card or use the digital card within the app.',
        },
        {
          number: '03',
          title: 'Redeem',
          description: 'KickBack® Points never expire. Spend your points like cash on our TOP TIER® fuel and convenience store items.',
        },
      ],
    },
    cards: [
      {
        id: 'redeem-points',
        title: 'Redeem points for gas and more',
        paragraphs: [
          'Pick up a KickBack Points card for free at any participating S&B Retail station and earn points that spend like cash on gas and other items. You must be enrolled in the KickBack Points Program to redeem points and be eligible for prize giveaways.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/thzariutom/jpeg/rewards-01.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
        imagePosition: 'right',
      },
      {
        id: 'participating-stations',
        title: 'Participating stations',
        paragraphs: [
          'KickBack Points is a fast-growing customer rewards program available at select S&B Retail stations. Each station gives out KickBack Points differently. Check your station’s KickBack Points offerings for more information. If your local station isn’t participating yet, why not encourage them to join?',
        ],
        imageUrl: 'https://phillips66.widen.net/content/6ewevuj4zc/jpeg/rewards-02.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
        imagePosition: 'left',
        primaryCta: { label: 'Find stations', link: '/contact' },
      },
      {
        id: 'giveaways',
        title: 'KickBack points giveaways',
        paragraphs: [
          'All enrolled KickBack Points cardholders are automatically entered to win seasonal prize drawings. Each card swipe is an entry, so the more swipes, the more chances you have to win tickets to sporting events, trips and more prizes! For a list of current giveaways and official rules visit the KickBack Points website.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/tot1k8n2rb/jpeg/rewards-03.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
        imagePosition: 'right',
        primaryCta: { label: 'View giveaways', link: 'https://kickbackpoints.com/' },
      },
      {
        id: 'nationwide-support',
        title: 'Nationwide support',
        paragraphs: [
          'Participating S&B Retail stations are a part of the KickBack Points coalition, which is expanding across the U.S. in a number of different retail locations including gas, grocery, and drug stores.',
        ],
        imageUrl: 'https://phillips66.widen.net/content/taytl2fxfd/jpeg/rewards-04.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
        imagePosition: 'left',
        primaryCta: { label: 'Find participating retailers', link: 'https://kickbackpoints.com/locations/' },
      },
    ],
    bottomBento: [
      {
        title: 'Manage Account',
        description: 'Login to check your points balance or make changes to your account.',
        buttonText: 'Login to your account',
        buttonLink: 'https://kickbackpoints.com/my-account/',
      },
      {
        title: 'Support',
        description: 'Do you have any questions about your KickBack Points card? Contact us.',
        phone: '1-888-339-7064',
        email: 'memberservices@kickbackpoints.com',
      },
    ],
  },

  giftCards: {
    hero: {
      headline: 'Gift Cards',
      body: 'S&B Retail gift cards make a perfect gift for your friends, family, and their cars. Available in denominations you set between $5 and $500, S&B Retail gift cards can be used to buy snacks at our convenience stores and quality fuel at any S&B pumps. Your friends, coworkers, clients and their cars will thank you for it.',
      imageUrl: 'https://phillips66.widen.net/content/ka6jknjdl7/jpeg/SV2300164_Front%20%28002%29.jpeg?w=640&keep=c&crop=yes&color=cccccc&quality=80&u=u6q5cu',
      primaryCta: { label: 'Buy now', link: 'https://phillips66.ourgiftcards.com/' },
      checkBalanceCta: { label: 'Check your balance', link: 'https://wbiprod.storedvalue.com/wbir/clients/phillips66enhanced' },
      termsCta: { label: 'Terms and conditions', link: 'https://mycardterms.com/phillips66/' },
    },
    features: [
      {
        number: '01',
        title: 'Custom Denominations',
        description: 'Choose any exact value from $5 to $500. Ideal for holiday gifts, team incentives, road trip gas money, and coffee snacks.',
      },
      {
        number: '02',
        title: 'Zero Fees & No Expiration',
        description: 'Funds never expire, with zero maintenance or dormancy fees. Your full card value stays intact until every penny is enjoyed.',
      },
      {
        number: '03',
        title: 'Accepted at Pumps & C-Stores',
        description: 'Redeemable for both TOP TIER™ certified fuels at the dispenser and inside our convenience stores for fresh food, beverages, and auto supplies.',
      },
    ],
  },
};
