/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				lab: {
					dark: '#0d0d1e',
					darker: '#070714',
					medium: '#1a1a2e',
					cyan: '#00ffe0',
					purple: '#b974f0',
					yellow: '#f7f700',
					text: '#a0a8c0',
					muted: '#6b7280',
				},
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'lab-grid': "url('/images/lab-grid.svg')",
				'lab-noise': "url('/images/noise.png')",
			},
			animation: {
				'glow': 'glow 1.5s ease-in-out infinite alternate',
				'terminal': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
				'glitch': 'glitch 0.5s cubic-bezier(.25, .46, .45, .94) both',
			},
			keyframes: {
				glow: {
					'0%': { 'box-shadow': '0 0 5px rgba(0, 255, 224, 0.5), 0 0 10px rgba(0, 255, 224, 0.2)' },
					'100%': { 'box-shadow': '0 0 10px rgba(0, 255, 224, 0.8), 0 0 20px rgba(0, 255, 224, 0.4)' },
				},
				typing: {
					'from': { width: '0' },
					'to': { width: '100%' },
				},
				'blink-caret': {
					'from, to': { 'border-color': 'transparent' },
					'50%': { 'border-color': '#00ffe0' },
				},
				glitch: {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' },
				},
			},
			boxShadow: {
				'neon-cyan': '0 0 5px rgba(0, 255, 224, 0.5), 0 0 10px rgba(0, 255, 224, 0.3)',
				'neon-purple': '0 0 5px rgba(185, 116, 240, 0.5), 0 0 10px rgba(185, 116, 240, 0.3)',
				'neon-yellow': '0 0 5px rgba(247, 247, 0, 0.5), 0 0 10px rgba(247, 247, 0, 0.3)',
			},
		},
	},
	plugins: [],
}; 