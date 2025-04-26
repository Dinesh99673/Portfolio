/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':'350px',
    },
    extend: {
      colors: {
        // 'heading': '#311D2A',
      },
      backgroundImage: {
        'heading-gradient': 'linear-gradient(to bottom left, rgba(49, 13, 13, 0.678), rgba(18, 13, 42, 0.863)), url("./assets/image.png")',
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
