import { Project } from '../types';

export const projects: Project[] = [
	{
		id: 'ugh-okay',
		title: 'Ugh Okay',
		description: 'A tiny offline app to help you stop doomscrolling.',
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