/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#4A0714",
          deep: "#4A0714",
          wine: "#31060D",
          base: "#48121F",
          dark: "#18050C",
          highlight: "#650D22",
        },
        charcoal: {
          DEFAULT: "#171416",
          dark: "#0D0B0D",
          light: "#252124",
        },
        ivory: {
          DEFAULT: "#F7E8D7",
          warm: "#F7E8D7",
          muted: "#EAD5C1",
        },
        rosegold: {
          DEFAULT: "#C88B91",
          muted: "#C88B91",
          light: "#DBA2A8",
          dark: "#A3686E",
        },
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(200, 139, 145, 0.35)',
        'luxury': '0 20px 40px -15px rgba(13, 11, 13, 0.65)',
        'modal': '0 25px 60px -12px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
}
