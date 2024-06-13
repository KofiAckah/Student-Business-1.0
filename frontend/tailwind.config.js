/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#2F6690",
          200: "#3A7CA5",
          300: "#B8B8B8",
          400: "#16425B",
          500: "#81C3D7",
        },
        secondary: {
          100: "#e8e8e8",
          200: "#464b4f",
        },
      },
    },
  },
  plugins: [],
};
