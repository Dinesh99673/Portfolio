/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs':'450px',
      'sm': '40rem',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: '#111114',           // page background — warm charcoal
        panel: '#18181C',         // cards / raised surfaces
        seam: '#26262C',          // borders
        copper: '#D98E4E',        // primary accent
        'copper-bright': '#EDAD72', // accent hover / links
        trace: '#8FBF9F',         // sparing secondary — live indicators only
        bone: '#EAE6DE',          // primary text
        ash: '#A19B90',           // muted text
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
