import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
        '@md': { min: '640px', max: '767px' },
        '@lg': { min: '768px', max: '1023px' },
        '@xl': { min: '1024px', max: '1279px' },
        '@2xl': { min: '1280px', max: '1535px' },
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
}
export default config
