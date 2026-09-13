import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Save,
  RotateCcw,
  Layout,
  CreditCard,
  Award,
  Gift,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Loader2,
  FileText,
  Layers,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_CARDS_REWARDS_CMS = {
  hub: {
    hero: {
      title: 'Cards & Rewards',
      subtitle: 'Explore our suite of cards and rewards to make the most of every mile.',
      badgeText: 'CARDS & REWARDS',
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
        theme: 'green',
        tag: 'Everyday Savings',
      },
      {
        id: 'kickback',
        title: 'KickBack® Rewards',
        subtitle: 'Earn points on everyday fuel & store purchases, then spend them like cash at participating pumps.',
        to: '/kickback',
        buttonText: 'Join KickBack®',
        imageUrl: 'https://phillips66.widen.net/content/sebzu6tx2p/jpeg/kickback-hero-01.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
        theme: 'slate',
        tag: 'Loyalty Points',
      },
      {
        id: 'gift-cards',
        title: 'Gift Cards',
        subtitle: 'The perfect gift for family, friends, and coworkers. Denominations from $5 to $500.',
        to: '/gift-cards',
        buttonText: 'Buy Gift Cards',
        imageUrl: 'https://phillips66.widen.net/content/ka6jknjdl7/jpeg/SV2300164_Front%20%28002%29.jpeg?w=640&keep=c&crop=yes&color=cccccc&quality=80&u=u6q5cu',
        theme: 'white',
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

export default function CardsRewardsCmsTab() {
  const queryClient = useQueryClient();
  const [activeSubTab, setActiveSubTab] = useState('hub'); // 'hub', 'credit', 'kickback', 'gift'
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_CARDS_REWARDS_CMS);

  // Fetch live CMS setting from PostgreSQL
  const { data: dbData, isLoading } = useQuery({
    queryKey: ['admin-setting', 'cards_rewards_cms'],
    queryFn: () => getSettingByKey('cards_rewards_cms'),
    staleTime: 0,
  });

  useEffect(() => {
    if (dbData?.value) {
      setFormData(dbData.value);
    }
  }, [dbData]);

  // Mutation to persist updates in PostgreSQL
  const updateMutation = useMutation({
    mutationFn: (value) => updateSetting('cards_rewards_cms', value),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-setting', 'cards_rewards_cms']);
      queryClient.invalidateQueries(['cards-rewards-cms']);
      toast.success('Cards & Rewards CMS saved successfully!');
    },
    onError: (err) => {
      toast.error(`Error saving: ${err.message}`);
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all Cards & Rewards settings back to system defaults?')) {
      setFormData(DEFAULT_CARDS_REWARDS_CMS);
      updateMutation.mutate(DEFAULT_CARDS_REWARDS_CMS);
    }
  };

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const res = await uploadImage(file);
      callback(res.url);
      toast.success('Media uploaded successfully!');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#016839]" />
        <span className="ml-3 text-sm text-slate-500 font-medium">Loading Cards &amp; Rewards CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Save Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">Cards &amp; Rewards CMS</h2>
            <span className="text-[11px] font-bold bg-[#016839] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Phillips 66 Style
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage the Cards &amp; Rewards Hub, Navbar flyout menu, and the 3 dedicated program subpages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending || isUploading}
            className="px-5 py-2 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-lg flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save All Changes
          </button>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('hub')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'hub'
              ? 'bg-[#016839] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          Hub &amp; Mega-Menu Flyout
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('credit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'credit'
              ? 'bg-[#016839] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Credit Cards Page
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('kickback')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'kickback'
              ? 'bg-[#016839] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          KickBack® Rewards Page
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('gift')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'gift'
              ? 'bg-[#016839] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          Gift Cards Page
        </button>
      </div>

      {/* SUBTAB 1: Hub & Mega-Menu Flyout */}
      {activeSubTab === 'hub' && (
        <div className="space-y-6">
          {/* Live Preview on #ebebef */}
          <div className="bg-[#ebebef] p-6 rounded-2xl border border-slate-300">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-3">
              Live Preview on Continuous Canvas (#ebebef)
            </span>
            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="bg-[#016839] rounded-[20px] p-6 flex items-center justify-center w-full md:w-[280px] h-[160px] shrink-0 shadow-md">
                <img
                  src={formData.navDropdown?.cardImage}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain drop-shadow"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-xl font-bold text-[#161616]">{formData.navDropdown?.title}</h4>
                <p className="text-sm text-slate-600">{formData.navDropdown?.description}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 text-sm font-bold text-[#161616]">
                {formData.navDropdown?.links?.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#016839]">
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hub Hero Editor */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              Hub Panoramic Hero Banner
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={formData.hub?.hero?.badgeText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hub: {
                        ...formData.hub,
                        hero: { ...formData.hub.hero, badgeText: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={formData.hub?.hero?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hub: {
                        ...formData.hub,
                        hero: { ...formData.hub.hero, title: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Background Media URL (or upload below)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.hub?.hero?.bgMediaUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hub: {
                        ...formData.hub,
                        hero: { ...formData.hub.hero, bgMediaUrl: e.target.value },
                      },
                    })
                  }
                  className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono text-xs"
                />
                <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(e) =>
                      handleImageUpload(e, (url) =>
                        setFormData({
                          ...formData,
                          hub: {
                            ...formData.hub,
                            hero: { ...formData.hub.hero, bgMediaUrl: url },
                          },
                        })
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Hub Intro Typography */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">Hub Intro Typography</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
              <input
                type="text"
                value={formData.hub?.intro?.headline || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hub: {
                      ...formData.hub,
                      intro: { ...formData.hub.intro, headline: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Body Text</label>
              <textarea
                rows={3}
                value={formData.hub?.intro?.body || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hub: {
                      ...formData.hub,
                      intro: { ...formData.hub.intro, body: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
          </div>

          {/* Mega-Menu Flyout Settings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              Navbar Dropdown Flyout Card (Image 1)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Flyout Title</label>
                <input
                  type="text"
                  value={formData.navDropdown?.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      navDropdown: { ...formData.navDropdown, title: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Graphic URL
                </label>
                <input
                  type="text"
                  value={formData.navDropdown?.cardImage || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      navDropdown: { ...formData.navDropdown, cardImage: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Flyout Description</label>
              <textarea
                rows={2}
                value={formData.navDropdown?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    navDropdown: { ...formData.navDropdown, description: e.target.value },
                  })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Credit Cards Page */}
      {activeSubTab === 'credit' && (
        <div className="space-y-6">
          {/* Credit Cards Hero */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              Credit Cards Hero Section (Image 2)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Headline</label>
                <input
                  type="text"
                  value={formData.creditCards?.hero?.headline || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creditCards: {
                        ...formData.creditCards,
                        hero: { ...formData.creditCards.hero, headline: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stacked Cards Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.creditCards?.hero?.bgMediaUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creditCards: {
                          ...formData.creditCards,
                          hero: { ...formData.creditCards.hero, bgMediaUrl: e.target.value },
                        },
                      })
                    }
                    className="flex-1 px-3 py-2 text-sm border rounded-lg font-mono text-xs"
                  />
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (url) =>
                          setFormData({
                            ...formData,
                            creditCards: {
                              ...formData.creditCards,
                              hero: { ...formData.creditCards.hero, bgMediaUrl: url },
                            },
                          })
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Cards CRUD Manager */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Credit Card Offerings (Split Cards)</h3>
                <p className="text-xs text-slate-500">
                  Add, edit, reorder or delete credit cards. 100% collapse-proof.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newCard = {
                    id: 'card-' + Date.now(),
                    title: 'New S&B Credit Card',
                    paragraphs: ['Card benefits and features description.'],
                    imageUrl: 'https://phillips66.widen.net/content/7pv15t7doa/png/new-cc-p66-card.png?position=c&color=ffffff00&quality=100&u=pqrmwb',
                    imagePosition: 'right',
                    primaryCta: { label: 'Apply now', link: '#' },
                    secondaryCta: { label: 'Manage account', link: '#' },
                  };
                  setFormData({
                    ...formData,
                    creditCards: {
                      ...formData.creditCards,
                      cards: [...(formData.creditCards?.cards || []), newCard],
                    },
                  });
                }}
                className="px-3.5 py-1.5 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Card
              </button>
            </div>

            <div className="space-y-4">
              {formData.creditCards?.cards?.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#016839] uppercase tracking-wider">
                      Card #{idx + 1}: {card.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const newCards = [...formData.creditCards.cards];
                          const temp = newCards[idx - 1];
                          newCards[idx - 1] = newCards[idx];
                          newCards[idx] = temp;
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.creditCards.cards.length - 1}
                        onClick={() => {
                          const newCards = [...formData.creditCards.cards];
                          const temp = newCards[idx + 1];
                          newCards[idx + 1] = newCards[idx];
                          newCards[idx] = temp;
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete card "${card.title}"?`)) {
                            const newCards = formData.creditCards.cards.filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              creditCards: { ...formData.creditCards, cards: newCards },
                            });
                          }
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...formData.creditCards.cards];
                          newCards[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Image Alignment
                      </label>
                      <select
                        value={card.imagePosition || 'right'}
                        onChange={(e) => {
                          const newCards = [...formData.creditCards.cards];
                          newCards[idx].imagePosition = e.target.value;
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                      >
                        <option value="right">Image on Right</option>
                        <option value="left">Image on Left</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Body Paragraphs (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={
                        Array.isArray(card.paragraphs)
                          ? card.paragraphs.join('\n\n')
                          : card.body || ''
                      }
                      onChange={(e) => {
                        const newCards = [...formData.creditCards.cards];
                        newCards[idx].paragraphs = e.target.value.split('\n\n');
                        setFormData({
                          ...formData,
                          creditCards: { ...formData.creditCards, cards: newCards },
                        });
                      }}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary CTA (Apply now) Link
                      </label>
                      <input
                        type="text"
                        value={card.primaryCta?.link || ''}
                        onChange={(e) => {
                          const newCards = [...formData.creditCards.cards];
                          newCards[idx].primaryCta = {
                            ...newCards[idx].primaryCta,
                            link: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Secondary CTA (Manage account) Link
                      </label>
                      <input
                        type="text"
                        value={card.secondaryCta?.link || ''}
                        onChange={(e) => {
                          const newCards = [...formData.creditCards.cards];
                          newCards[idx].secondaryCta = {
                            ...newCards[idx].secondaryCta,
                            link: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            creditCards: { ...formData.creditCards, cards: newCards },
                          });
                        }}
                        className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: KickBack Rewards Page */}
      {activeSubTab === 'kickback' && (
        <div className="space-y-6">
          {/* KickBack Hero */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              KickBack® Rewards Hero (Image 3)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Headline</label>
                <input
                  type="text"
                  value={formData.kickback?.hero?.headline || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kickback: {
                        ...formData.kickback,
                        hero: { ...formData.kickback.hero, headline: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Background Image URL (Wallet &amp; Card)
                </label>
                <input
                  type="text"
                  value={formData.kickback?.hero?.bgMediaUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kickback: {
                        ...formData.kickback,
                        hero: { ...formData.kickback.hero, bgMediaUrl: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
              <textarea
                rows={2}
                value={formData.kickback?.hero?.subtitle || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kickback: {
                      ...formData.kickback,
                      hero: { ...formData.kickback.hero, subtitle: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
          </div>

          {/* How It Works Steps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              "How It Works" 3-Step Bento Grid
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.kickback?.howItWorks?.steps?.map((step, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-[#016839]">Step #{idx + 1}</span>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const newSteps = [...formData.kickback.howItWorks.steps];
                      newSteps[idx].title = e.target.value;
                      setFormData({
                        ...formData,
                        kickback: {
                          ...formData.kickback,
                          howItWorks: { ...formData.kickback.howItWorks, steps: newSteps },
                        },
                      });
                    }}
                    className="w-full px-2.5 py-1.5 text-sm border rounded bg-white font-bold"
                  />
                  <textarea
                    rows={3}
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...formData.kickback.howItWorks.steps];
                      newSteps[idx].description = e.target.value;
                      setFormData({
                        ...formData,
                        kickback: {
                          ...formData.kickback,
                          howItWorks: { ...formData.kickback.howItWorks, steps: newSteps },
                        },
                      });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs border rounded bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Gift Cards Page */}
      {activeSubTab === 'gift' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b pb-3">
              Gift Cards Split Hero (Image 4)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={formData.giftCards?.hero?.headline || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCards: {
                        ...formData.giftCards,
                        hero: { ...formData.giftCards.hero, headline: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gift Card Graphic URL
                </label>
                <input
                  type="text"
                  value={formData.giftCards?.hero?.imageUrl || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCards: {
                        ...formData.giftCards,
                        hero: { ...formData.giftCards.hero, imageUrl: e.target.value },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Body Description
              </label>
              <textarea
                rows={3}
                value={formData.giftCards?.hero?.body || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    giftCards: {
                      ...formData.giftCards,
                      hero: { ...formData.giftCards.hero, body: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Buy Now Link
                </label>
                <input
                  type="text"
                  value={formData.giftCards?.hero?.primaryCta?.link || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCards: {
                        ...formData.giftCards,
                        hero: {
                          ...formData.giftCards.hero,
                          primaryCta: { ...formData.giftCards.hero.primaryCta, link: e.target.value },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Check Balance Link
                </label>
                <input
                  type="text"
                  value={formData.giftCards?.hero?.checkBalanceCta?.link || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCards: {
                        ...formData.giftCards,
                        hero: {
                          ...formData.giftCards.hero,
                          checkBalanceCta: {
                            ...formData.giftCards.hero.checkBalanceCta,
                            link: e.target.value,
                          },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Terms &amp; Conditions Link
                </label>
                <input
                  type="text"
                  value={formData.giftCards?.hero?.termsCta?.link || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      giftCards: {
                        ...formData.giftCards,
                        hero: {
                          ...formData.giftCards.hero,
                          termsCta: { ...formData.giftCards.hero.termsCta, link: e.target.value },
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
