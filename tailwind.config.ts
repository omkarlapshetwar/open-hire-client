import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6', // Blue
        'primary-light': '#93C5FD',
        'background': '#F3F4F6',
        'card': 'rgba(255, 255, 255, 0.7)',
        'secondary': '#4B5563',
        'accent': '#8B5CF6', // Purple
        'text-primary': '#1F2937',
        'text-secondary': '#4B5563',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backdropFilter: {
        'glass': 'blur(20px)',
      },
    },
  },
  plugins: [],
};

export default config;