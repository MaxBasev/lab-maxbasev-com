import { Project } from '../types';

export const projects: Project[] = [
	{
		id: 'ugh-okay',
		title: 'Ugh Okay',
		description: 'A tiny offline app that helps you fight indecision and doomscrolling. Add things you actually want to do - then tap the button when your brain freezes. It picks one for you. That\'s it. No sync, no pressure, no pushy owl.',
		icon: '🧠',
		image: '/images/projects/UghOkay.webp',
		tags: ['Mobile App', 'Pet Project'],
		links: {
			website: 'https://ughokay.maxbasev.com',
			appStore: 'https://apps.apple.com/kg/app/ugh-okay/id6744969077',
			googlePlay: 'https://play.google.com/store/apps/details?id=com.ughokay.app',
			blog: 'https://blog.maxbasev.com/i-made-a-chrome-extension-that-rewards-you-for-doing-literally-anything/'
		}
	},
	{
		id: 'offgrid-diary',
		title: 'Offgrid Diary',
		description: 'A paper-like mobile diary that works on airplane mode with AES-256 encryption and offline AI summaries. 6-digit PIN security, time-warp feature to see entries from previous years.',
		icon: '🔒',
		image: '/images/projects/OffgridDiary/Offgrid-Diary-og.png',
		tags: ['Mobile App', 'iOS App', 'Pet Project', 'AI-powered'],
		links: {
			website: 'https://offgriddiary.app',
			appStore: 'https://apps.apple.com/kg/app/offgrid-diary/id6748696045',
			blog: 'https://blog.maxbasev.com/saas/offgrid-diary-weekend-build/'
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
		id: 'extenswitch',
		title: 'ExtenSwitch',
		description: 'Quickly toggle Chrome extensions with a single click. Perfect for crypto wallet wranglers, devs, or anyone who forgot why they installed 14 extensions in the first place.',
		icon: '🧩',
		image: '/images/projects/ExtenSwitch.png',
		tags: ['Chrome Extension', 'Tool', 'Pet Project'],
		links: {
			website: 'https://chromewebstore.google.com/detail/pkgomffofapfpgmebfcdjnchjleflpcn?utm_source=item-share-cb',
			blog: 'https://blog.maxbasev.com/the-journey-of-creating-extenswitch/'
		}
	},
	{
		id: 'santa-maria-dashboard',
		title: 'Santa Maria Health Dashboard',
		description: 'A full-scale web system for clinics: patient bookings, scheduling, invoices, medical records, and admin management — all in one place.',
		icon: '🏥',
		image: '/images/projects/Santa_Maria_logo.png',
		tags: ['Web App', 'Freelance Work'],
		links: {
			website: 'https://sybillehealth.com/booking',
			blog: 'https://maxbasev.gitbook.io/santa-maria-dashboard/en/menu'
		}
	},
	{
		id: 'bare-minimum-hero',
		title: 'Bare Minimum Hero',
		description: 'A Chrome extension that rewards you for doing the absolute bare minimum. Because consistency > crushing it.',
		icon: '🦸‍♂️',
		image: '/images/projects/BMH_promo.png',
		tags: ['Chrome Extension', 'Pet Project', 'Tool'],
		links: {
			website: 'https://bareminimumhero.com',
			blog: 'https://blog.maxbasev.com/i-made-a-chrome-extension-that-rewards-you-for-doing-literally-anything/'
		}
	},
	{
		id: 'crypto-access-bot',
		title: 'Level UP — Crypto Access Bot',
		description: 'A custom Telegram bot that manages crypto subscriptions for the Level UP community. Supports multi-chain payments, verifies transactions, and handles access control automatically.',
		icon: '🔐',
		image: '/images/projects/crypto-subscription.png',
		tags: ['Freelance Work', 'Crypto'],
		links: {
			blog: 'NDA'
		}
	},
	{
		id: 'focus-buddy',
		title: 'Focus Buddy',
		description: 'Chrome extension that blocks distracting websites and helps you stay focused.',
		icon: '🎯',
		image: '/images/projects/Focus_Buddy_promo.png',
		tags: ['Chrome Extension', 'Tool'],
		links: {
			website: 'https://chromewebstore.google.com/detail/ccjjaibohkfmlljiggepjecnlddehpkc?utm_source=item-share-cb',
			github: 'https://github.com/MaxBasev/focus-buddy'
		}
	},
	{
		id: 'santa-maria-ios',
		title: 'Santa Maria – iOS Client App',
		description: 'A mobile companion app for clinic patients: view bookings, treatment schedules, and upcoming procedures — right from your iPhone.',
		icon: '📱',
		image: '/images/projects/Santa_Maria_logo.png',
		tags: ['iOS App', 'Freelance Work'],
		links: {
			appStore: 'https://apps.apple.com/us/app/santa-maria-mobile/id6470041758'
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
			website: 'https://chromewebstore.google.com/detail/dhgdhhgndiifpgggdnmaclknboipnjkd?utm_source=item-share-cb'
		}
	},
]; 