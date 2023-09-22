/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#900C3F",
        secondary: "#F8DE22",
        accent: "#F94C10",
        background: "#EAC696",
      },
      boxShadow: {
        surround: "0px 0px 7px",
      },
    },
  },
  plugins: [],
}

