/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#2DD687',
        lightblue: '#00BDC7',
        secondary: '#2F41CA',
        purple: '#7B6CE6',
      },
      fontFamily: {
        campton: ['Campton', 'sans-serif'],
        tabletgothic: ['TabletGothic', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2DD687',

          secondary: '#00BDC7',

          accent: '#2F41CA',

          neutral: '#191D24',

          'base-100': '#2A303C',

          info: '#7B6CE6',

          success: '#36D399',

          warning: '#fcda00',

          error: '#fc3f65',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
