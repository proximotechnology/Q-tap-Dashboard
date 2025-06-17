/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-', // avoids conflict with MUI // 👈 THIS IS REQUIRED!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}