import { Project } from '../types';

export const projects: Project[] = [
	{
		id: 'bare-minimum-hero',
		title: 'Bare Minimum Hero',
		description: 'A Chrome extension that rewards you for doing the absolute bare minimum. Because consistency > crushing it.',
		icon: '🦸‍♂️',
		image: '/images/projects/BMH_promo.png',
		tags: ['Chrome Extension', 'Pet Project', 'Tool'],
		links: {
			website: 'https://bareminimumhero.com',
			blog: 'https://chrome.google.com/webstore'
		}
	},
	{
		id: 'tagoshi',
		title: 'Tagoshi',
		description: 'Convert prices on Amazon, eBay, and AliExpress into crypto using live Binance rates. BTC, ETH, SOL, BNB, XRP — right where you shop.',
		icon: '💰',
		image: '/images/projects/Tagoshi_Promo.png',
		tags: ['Chrome Extension', 'Tool', 'Pet Project', 'Crypto'],
		links: {
			website: 'https://skazoff.ru',
			blog: 'https://chrome.google.com/webstore'
		}
	},
	{
		id: 'crypto-news-bot',
		title: 'Crypto News Bot',
		description: 'AI-powered Telegram bot that aggregates and translates crypto news. Built with GPT, MongoDB, and a custom dashboard.',
		icon: '🛰️',
		image: '/images/projects/TGBot.png',
		tags: ['Freelance Work', 'AI-powered'],
		links: {
			blog: 'NDA'
		}
	},
	{
		id: 'zentava',
		title: 'Zentava',
		description: 'An AI-powered mental health assistant. Still in beta, still figuring things out — just like you. Available 24/7, judgment-free.',
		icon: '🧠',
		image: '/images/projects/zentava-life-logo-transp.png',
		tags: ['SaaS', 'Web App', 'Beta', 'AI-powered'],
		links: {
			website: 'https://zentava.life'
		}
	},
	{
		id: 'cheqly-life',
		title: 'Cheqly Life',
		description: 'Track your goals efficiently. Build habits that stick. Cheqly helps you stay consistent and motivated with simple daily check-ins and visual feedback. No endless forms. No distractions. Just a clean interface focused on momentum.',
		icon: '📈',
		image: '/images/projects/Cheqly_Promo.png',
		tags: ['SaaS', 'Web App', 'Beta'],
		links: {
			website: 'https://cheqly.life'
		}
	},
	{
		id: 'extenswitch',
		title: 'ExtenSwitch',
		description: 'Quickly toggle Chrome extensions with a single click. Perfect for crypto wallet wranglers, devs, or anyone who forgot why they installed 14 extensions in the first place.',
		icon: '🧩',
		image: '/images/projects/ExtenSwitch.png',
		tags: ['Chrome Extension', 'Tool', 'Pet Project'],
		links: {
			website: 'https://chrome.google.com/webstore'
		}
	},
	{
		id: 'ugh-okay',
		title: 'Ugh Okay',
		description: 'A tiny offline app that helps you fight indecision and doomscrolling. Add things you actually want to do - then tap the button when your brain freezes. It picks one for you. That\'s it. No sync, no pressure, no pushy owl.',
		icon: '🧠',
		image: '/images/projects/UghOkay.png',
		tags: ['Mobile App', 'Pet Project'],
		links: {
			website: 'https://ughokay.maxbasev.com',
			appStore: 'https://apps.apple.com/kg/app/ugh-okay/id6744969077',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.ughokay.app',
			blog: 'https://en.skazoff.com/i-made-a-chrome-extension-that-rewards-you-for-doing-literally-anything/'
		}
	},
	{
		id: 'focus-buddy',
		title: 'Focus Buddy',
		description: 'Chrome extension that blocks distracting websites and helps you stay focused.',
		icon: '🎯',
		tags: ['Chrome Extension', 'Tool'],
		links: {
			website: 'https://focusbuddy.maxbasev.com',
			github: 'https://github.com/MaxBasev/focus-buddy'
		}
	},
	{
		id: 'pocket-journal',
		title: 'Pocket Journal',
		description: 'Minimalist journaling app for daily reflections and gratitude.',
		icon: '📔',
		tags: ['Mobile App', 'SaaS'],
		links: {
			website: 'https://pocketjournal.maxbasev.com',
			appStore: 'https://apps.apple.com/app/pocket-journal/id123456789',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.pocketjournal.app'
		}
	},
	{
		id: 'code-snippets',
		title: 'Code Snippets',
		description: 'A collection of reusable code snippets for web developers.',
		icon: '💻',
		tags: ['Tool', 'Pet Project'],
		links: {
			website: 'https://snippets.maxbasev.com',
			github: 'https://github.com/MaxBasev/code-snippets'
		}
	},
	{
		id: 'design-agency',
		title: 'Design Agency Website',
		description: 'Custom website built for a graphic design agency.',
		icon: '🎨',
		tags: ['Freelance Work'],
		links: {
			website: 'https://designagency.example.com'
		}
	},
	{
		id: 'weather-widget',
		title: 'Weather Widget',
		description: 'Simple weather forecast widget for your website.',
		icon: '☀️',
		tags: ['Tool', 'Dead Project'],
		links: {
			github: 'https://github.com/MaxBasev/weather-widget'
		}
	},
	{
		id: 'travel-planner',
		title: 'Travel Planner',
		description: 'Plan your trips, track expenses, and discover new places.',
		icon: '✈️',
		tags: ['SaaS', 'Pet Project'],
		links: {
			website: 'https://travelplanner.maxbasev.com',
			github: 'https://github.com/MaxBasev/travel-planner'
		}
	},
	{
		id: 'habit-tracker',
		title: 'Habit Tracker',
		description: 'Track your daily habits and build a better routine.',
		icon: '📊',
		tags: ['Mobile App', 'SaaS'],
		links: {
			website: 'https://habits.maxbasev.com',
			appStore: 'https://apps.apple.com/app/habit-tracker/id987654321',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.habittracker.app'
		}
	}
]; 