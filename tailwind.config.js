/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Walmart-inspired palette
        primary: '#0071ce', // Walmart Blue
        accent: '#ffc220', // Walmart Yellow
        success: '#22c55e', // Green for confirmations
        error: '#ef4444',   // Red for warnings
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Using Inter as the consistent font
      },
    },
  },
  plugins: [],
};
