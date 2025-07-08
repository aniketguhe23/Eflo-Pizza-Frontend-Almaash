// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aclonica: ["Aclonica", "sans-serif"],
        gantari: ["Gantari", "sans-serif"],
        instrument: ["Instrument Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        barlowCondensed: ["var(--font-barlow-condensed)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
