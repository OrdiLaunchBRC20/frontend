/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font: "Montserrat",
        fontHeading: "Montserrat",
      },
      colors: {
        primary: "#FF9A02",
        secondary: "#FFC702",
        color: "#FFFFFF",
        heading: "#FFFFFF",
        dark: "#140C00",
        bg: "#050300",
        border: "#23211F",
      },
      flex: {
        auto: "0 0 auto",
      },
      screens: {
        lg: "991px",
        // => @media (min-width: 991px) { ... }
      },
      backgroundImage: {
        main: "url('/public/images/bg.png')",
      },
    },
  },
  plugins: [],
};
