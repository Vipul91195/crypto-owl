
const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        // ms: { min: "0px", max: "575px" },
        ms: "375px",
      },
      fontFamily: {
        Sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        pink: {
          light: "#CDBEBE"
        }
      },
      backgroundImage: {
        checkTrue: "url('../src/assets/img/checkTrue.svg')",
        checkFalse: "url('../src/assets/img/checkFalse.svg')"
      }
    },
  },
  plugins: [],
}
