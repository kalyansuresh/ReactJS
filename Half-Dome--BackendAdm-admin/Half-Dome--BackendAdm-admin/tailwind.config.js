/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          dark: "#5f739b",
          // dark: "#446AA8",
          medium: "#90A5D1",
          light: "#C9DAF8",
          lightest: "#F2F7FE",
        },
        gray: {
          dark: "#666666",
          light: "#CCCCCC",
        },
        coral: "#FA7457",
        peach: "#F8D7C4",
        sand: "#F3E9E2",
        sage: "#D8E1DC",
      },
      fontFamily: {
        argent: ["Argent CF", "inter", "cursive"],
      },
    },
  },
  plugins: [],
};