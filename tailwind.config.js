/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':'450px',
      // => @media (min-width: 350px) { ... }

      'sm': '40rem',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
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
