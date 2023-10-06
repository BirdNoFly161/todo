/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A34A28",
        secondary: "#DFDDC7",
        accent: "#211717",
        background: "#F58B54",
      },
      boxShadow: {
        surround: "0px 0px 7px",
      },
    },
  },
  plugins: [],
};
