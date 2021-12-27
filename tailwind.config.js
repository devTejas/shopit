module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        shopit_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        shopit_orange: "#fc7a69",
      },
      fontFamily: {
        Poppins: "'Poppins', 'Verdana', monospace",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
