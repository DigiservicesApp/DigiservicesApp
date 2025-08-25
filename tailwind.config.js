/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-slate': '#1A202C',
        'electric-blue': {
          DEFAULT: '#007BFF',
          hover: '#0056b3',
        },
        'light-accent': '#F7FAFC',
        'border-color': '#E2E8F0',
        success: '#38A169',
        error: '#E53E3E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-satoshi)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
