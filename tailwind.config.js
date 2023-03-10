/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi"],
        dancing: ["Dancing"],
        generalsans: ["generalsans"],
      },
      fontSize: {
        xxs: [
          "0.65rem",
          {
            lineHeight: "1rem",
          },
        ],
        xxxs: [
          "0.55rem",
          {
            lineHeight: "1rem",
          },
        ],
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },

      animation: {
        gradientChange: "gradientChange 1s infinite",
      },
      keyframes: {},
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
