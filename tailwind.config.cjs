/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'p-primary': '#f5f7fa',
        'p-from': '#FFFFFF',
        'p-bw': '#d9e0e3',
        'p-to': '#00a99d;',
      },
    },
  },
  plugins: [require('daisyui')],
};
