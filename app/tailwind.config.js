/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CD8D7A",
        secondary: "#DBCC95",
        accent: "#EEC759",
        background: "#f2f2f2",
        border: "#62664B",
      },
      boxShadow: {
        surround: "0px 0px 7px",
      },
      keyframes: {
        appearLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        appearLeft: "appearLeft .25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
