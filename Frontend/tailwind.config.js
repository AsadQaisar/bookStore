/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'textbox-bg': '#1d232a',
                'text-boarder': '#1e2635',
              },
        },
    },
    plugins: [require("daisyui")],
};