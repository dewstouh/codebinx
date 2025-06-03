/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'apple-gray': {
                    light: '#f5f5f7',
                    DEFAULT: '#1d1d1f',
                    dark: '#1d1d1f',
                },
                'apple-blue': {
                    light: '#007aff',
                    DEFAULT: '#007aff',
                }
                // ... más colores
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
}