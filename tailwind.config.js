/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f172a', // Slate 900 - Deep, premium dark
                    light: '#1e293b',   // Slate 800
                    dark: '#020617',    // Slate 950
                },
                accent: {
                    DEFAULT: '#f59e0b', // Amber 500 - Rich Gold
                    hover: '#d97706',   // Amber 600
                    light: '#fbbf24',   // Amber 400
                },
                secondary: {
                    DEFAULT: '#0ea5e9', // Sky 500 - Vibrant Blue
                    dark: '#0284c7',    // Sky 600
                },
                dark: '#0f172a',
                light: '#f8fafc',
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
                'glow': '0 0 20px rgba(14, 165, 233, 0.5)',
            },
            animation: {
                'float': 'floaty 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'zoom-out': 'zoomOut 20s linear infinite alternate',
                'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-in-left': 'slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'bounce-in': 'bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'rotate-in': 'rotateIn 0.6s ease-out forwards',
                'flip-in': 'flipIn 0.6s ease-out forwards',
                'ken-burns': 'kenBurns 25s ease-in-out infinite alternate',
            },
            keyframes: {
                floaty: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                zoomOut: {
                    '0%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1.0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.3)' },
                    '50%': { boxShadow: '0 0 25px rgba(245, 158, 11, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                rotateIn: {
                    '0%': { opacity: '0', transform: 'rotate(-15deg) scale(0.8)' },
                    '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
                },
                flipIn: {
                    '0%': { opacity: '0', transform: 'perspective(400px) rotateY(-90deg)' },
                    '100%': { opacity: '1', transform: 'perspective(400px) rotateY(0)' },
                },
                kenBurns: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.15) translate(-2%, -1%)' },
                    '100%': { transform: 'scale(1.1) translate(1%, 2%)' },
                },
            }
        },
    },
    plugins: [],
}
