/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Mengaktifkan mode gelap berbasis class
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // Mendaftarkan variabel CSS sebagai warna di Tailwind
                // agar kita bisa menggunakan class seperti `bg-background`
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
        },
    },
    plugins: [],
};
