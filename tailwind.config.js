/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      bgDark: "#100F0F",
      textDark: "#F1F1F1",
      primaryDark: "#0078AA",
      bgLight: "#fff",
      textLight: "#000",
      primaryLight: "#1F4690",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
