/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Classic Forecourt Petrol & Diesel Palette
        petrol: {
          50: '#f0f9fa',
          100: '#d7eff2',
          200: '#b4e1e7',
          300: '#94d2bd',         // Petrol soft cyan
          400: '#0a9396',         // Vibrant petrol teal
          500: '#005f73',         // Primary classic petrol blue
          600: '#0a424e',         // Rich petroleum shade
          700: '#08333d',
          800: '#0a2e38',
          900: '#071e26',         // Deep midnight petroleum dark
        },
        diesel: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',         // Bright diesel gold
          500: '#f59e0b',         // Classic diesel amber
          600: '#d97706',         // Deep diesel honey/amber
          700: '#b45309',         // Burnished diesel bronze
          800: '#92400e',
          900: '#78350f',
        },
        // Backward-compatible Londis mapping re-themed to Classic Petrol & Diesel
        londis: {
          green: '#005f73',       // Primary Brand Petrol Blue
          lime: '#f59e0b',        // Dynamic Diesel Amber Accent
          'lime-light': '#fbbf24',
          shade: '#071e26',       // Midnight Petrol Dark Hover
          tint: '#f0f9fa',        // Soft Petrol Mint Tint
          black: '#071217',
        },
        conoco: {
          red: '#005f73',         // Mapped to Petrol Blue
          'red-80': '#0a9396',
          'red-10': '#f0f9fa',
          'red-shade': '#071e26',
          black: '#161616',
        },
        brand: {
          50: '#f0f9fa',
          100: '#d7eff2',
          400: '#f59e0b',         // Diesel Amber Gold
          500: '#005f73',         // Classic Petrol Blue
          600: '#071e26',         // Midnight Petrol Dark
          700: '#05171d',
          900: '#020b0e',
        },
        webgray: '#ebebef',
        uigray: '#797979',
        inactive: '#c9c9c9',
        darkblack: '#000000',
        darkbtn: '#1c2830',
        ink: '#12181d',
        p66: {
          red: '#005f73',
          shade: '#071e26',
          tint: '#f0f9fa',
        },
      },
      fontFamily: {
        sans: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        gotham: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        headings: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        founders: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
        cta: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
        button: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
      },
      fontSize: {
        'headline-1': ['var(--wp--custom--typography--headline-1--font-size, 60px)', { lineHeight: 'var(--wp--custom--typography--headline-1--line-height, 1.167)', fontWeight: '700' }],
        'headline-2': ['var(--wp--custom--typography--headline-2--font-size, 42px)', { lineHeight: 'var(--wp--custom--typography--headline-2--line-height, 1.095)', fontWeight: '700' }],
        'headline-3': ['var(--wp--custom--typography--headline-3--font-size, 34px)', { lineHeight: 'var(--wp--custom--typography--headline-3--line-height, 1.294)', fontWeight: '700' }],
        'headline-4': ['var(--wp--custom--typography--headline-4--font-size, 26px)', { lineHeight: 'var(--wp--custom--typography--headline-4--line-height, 1.154)', fontWeight: '700' }],
        'headline-5': ['var(--wp--custom--typography--headline-5--font-size, 20px)', { lineHeight: 'var(--wp--custom--typography--headline-5--line-height, 1.4)', fontWeight: '700' }],
        'headline-6': ['var(--wp--custom--typography--headline-6--font-size, 14px)', { lineHeight: 'var(--wp--custom--typography--headline-6--line-height, 1.429)', fontWeight: '400' }],
        'button-text': ['var(--wp--custom--typography--button-text--font-size, 18px)', { lineHeight: 'var(--wp--custom--typography--button-text--line-height, 20px)', fontWeight: '600', letterSpacing: '-0.15px' }],
        'nav-1': ['var(--wp--custom--typography--nav-1--font-size, 16px)', { lineHeight: 'var(--wp--custom--typography--nav-1--line-height, 1.5)', fontWeight: '500' }],
        'body-1': ['var(--wp--custom--typography--paragraph-1--font-size, 16px)', { lineHeight: 'var(--wp--custom--typography--paragraph-1--line-height, 1.625)', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-2': ['var(--wp--custom--typography--paragraph-2--font-size, 12px)', { lineHeight: 'var(--wp--custom--typography--paragraph-2--line-height, 1.667)', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-3': ['var(--wp--custom--typography--paragraph-3--font-size, 20px)', { lineHeight: 'var(--wp--custom--typography--paragraph-3--line-height, 1.6)', fontWeight: '400', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};
