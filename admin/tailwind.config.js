/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        petrol: {
          50: '#f0f9fa',
          100: '#d7eff2',
          300: '#94d2bd',
          400: '#0a9396',
          500: '#005f73',
          600: '#0a424e',
          900: '#071e26',
        },
        diesel: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        londis: {
          green: '#005f73',
          lime: '#f59e0b',
          'lime-light': '#fbbf24',
          shade: '#071e26',
          tint: '#f0f9fa',
          black: '#071217',
        },
        conoco: {
          red: '#005f73',
          'red-80': '#0a9396',
          'red-10': '#f0f9fa',
          'red-shade': '#071e26',
          black: '#161616',
        },
        brand: {
          50: '#f0f9fa',
          100: '#d7eff2',
          400: '#f59e0b',
          500: '#005f73',
          600: '#071e26',
          700: '#05171d',
          900: '#020b0e',
        },
        ink: '#12181d',
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
    },
  },
  plugins: [],
};
