/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
  important: true,
};
