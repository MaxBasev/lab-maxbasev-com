'use client';

import React from 'react';
import Image from 'next/image';
import { TagBadge } from './TagBadge';
import { projects } from '../data/projects';

// Default content for projects
const PROJECT_CONTENTS: Record<string, string> = {
	'ugh-okay': `📱 Ugh Okay — The Button That Saves Your Brain
🚀 About the Project
A tiny mobile app to fight doomscrolling.
One button. One random task. A slightly better day.
Built during a real-life procrastination spiral.

🔥 The Problem
Most productivity apps are too overwhelming when you're stuck in paralysis.
Ugh Okay offers one small action — no pressure, no guilt, no endless checklists.

🛠️ The Solution
Preloaded activities (or add your own)
Tap when stuck
Get a random task suggestion
Tap again if you don't like it
Remove tasks you hate forever
Fully offline. No accounts. No tracking.
Language switch between English and Russian.

📈 Tech Stack
Built with React Native (Expo)
AsyncStorage for persistent local data
No backend, fully offline
i18n for multi-language support

🧠 Product Philosophy
Minimalism over features
Sarcasm over self-improvement guilt
Action over anxiety

✨ Key Features
🔒 100% Offline, Private
🎯 Focused on Action, Not Planning
🔄 Randomized Suggestions
🇬🇧🇷🇺 Language Switching
🧹 No Ads, No Tracking, No Push Notifications

🔮 What's Next
Widget support for even faster access
"Hard mode" (you MUST do the first suggestion)
Mini insights: track tiny victories

📸 Screenshots
[IMAGE_GALLERY]

🚀 Try It
Download on App Store or Google Play.
Or, you know... keep doomscrolling. (No pressure.)`,
	'zentava': `🧘 Zentava — Your Personal AI Mentor
🚀 About the Project
Zentava is an AI-powered mentor designed to support your personal growth, emotional balance, and decision-making clarity.

Built to provide encouragement and tailored advice through natural conversations — anytime you need a nudge forward.

🔥 The Problem
Self-improvement tools often feel cold, overwhelming, or judgmental.

Zentava offers warm, non-judgmental AI conversations that prioritize your mental well-being and real-world momentum.

🛠️ The Solution

Set personal goals or simply talk things out

Personalized AI feedback using ChatGPT

Track your emotional state and progress

Designed for clarity, not complexity

📈 Tech Stack

Frontend: Next.js

Backend: Node.js + MongoDB

Authentication: Firebase Auth

AI Layer: OpenAI ChatGPT API

🧠 Product Philosophy

Growth without pressure

Conversations over endless to-do lists

Progress over perfection

✨ Key Features
🔒 Private, Secure Conversations
🧘 Personalized Mentorship with AI
📈 Light Progress Tracking
🎯 Focused on Mental Clarity and Growth
🌐 Multi-language support (EN, RU, ES)

🔮 What's Next

Full public launch after private beta

Expanded conversation topics

Deeper emotional tracking features

📸 Screenshots

🧪 Behind the Scenes
Initial idea prototyped over a few intense coffee-fueled nights.
Tested with early users through invite-only beta.
Feedback loop driven by real conversations and actual user struggles.

🚀 Try It
Sign up for the waitlist at Zentava.life and be among the first to meet your AI mentor.`,
	'santa-maria-dashboard': `🏥 Santa Maria — Health Management Platform
🚀 About the Project
A full-featured web system for clinics to manage patient bookings, treatment schedules, medical records, and financial operations — all in one place.

Built for real-world clinic workflows, not just theoretical "best practices."

🔥 The Problem
Traditional clinic software is either outdated, overly complicated, or requires expensive customization.

Santa Maria Dashboard was created to deliver a flexible, modern, all-in-one system tailored for everyday use by doctors, staff, and administrators.

🛠️ The Solution

Appointment scheduling and patient booking

Medical treatment tracking and exam records

Invoice management and financial reporting

Multi-role access system (admin, doctor, accountant)

Internal analytics dashboards

📈 Tech Stack

Frontend: Angular

Backend: Node.js + Express

Database: MongoDB

Authentication: Firebase Auth

Hosting: Dedicated cloud servers

🧠 Product Philosophy

Practicality over bells and whistles

Clear workflows for medical and administrative staff

Scalability for growing clinic networks

✨ Key Features
📅 Advanced Appointment Scheduling
📋 Full Patient Medical Records
💳 Invoice and Payment Management
🧑‍⚕️ Multi-Role Permissions System
📊 Operational Dashboards and Analytics
🌐 Language Support (Multilingual ready)

🔮 What's Next

Patient portal for online booking and personal records

Integration with insurance providers

Mobile app expansion

📸 Screenshots
Admin Dashboard overview
Appointment scheduling module
Patient profile and treatment history
Financial analytics reports

🧪 Behind the Scenes
Designed from real clinical requirements after consulting with medical practitioners.
Iteratively improved based on feedback from actual clinic operations.
Built under NDA — client details confidential.

🚀 Try It
Currently deployed and in daily use by private medical centers.
Demo access available upon request.`,
	'extenswitch': `🧩 ExtenSwitch — One-Click Chrome Extension Manager
🚀 About the Project
A minimalistic Chrome extension for instantly enabling or disabling other extensions with a single click — perfect for crypto wallets, dev tools, or any cluttered browser setup.

Built out of frustration with endless trips to Chrome settings.

🔥 The Problem
Managing multiple Chrome extensions (especially wallets, tools, and plugins) is a hassle.
Chrome's built-in UI for enabling/disabling is slow and buried deep in menus.

🛠️ The Solution

One-click toggle for all your installed extensions

Smart filters: view All, Enabled, or Disabled extensions

Lightweight popup interface

Focused on speed and zero-friction UX

📈 Tech Stack

Manifest v3 (Chrome Extensions API)

Vanilla JavaScript + HTML + TailwindCSS

No external dependencies

Minimal local storage usage

🧠 Product Philosophy

Speed over complexity

Local-only operation (no backend)

Built to solve a real daily irritation

✨ Key Features
⚡ Instant Toggle of Extensions
🧹 Declutter Your Browser in Seconds
🔎 Filter by Enabled/Disabled Status
🔒 No Data Collection or Tracking

🔮 What's Next

Group extensions into custom sets

Quick-enable profiles (e.g., "Crypto Work Mode" vs "Gaming Mode")

Dark theme for popup UI

📸 Screenshots
Main popup view with extensions
Enabled/disabled filter example
Settings and management screen (minimal)

🧪 Behind the Scenes
Built in a weekend sprint to scratch an itch.
Inspired by juggling too many crypto wallets and dev tools.
Currently available on Chrome Web Store (pending review).

🚀 Try It
Install on Chrome and experience instant control over your extensions!`,
	'crypto-news-bot': `🧠 Crypto News Bot — Project Details
📰 AI-Powered Crypto News Aggregator for Telegram
🚀 About the Project
An internal tool built for a private client (under NDA) to deliver translated and curated crypto news directly into a Telegram channel — powered by GPT and a fully custom backend.

Built to streamline multilingual crypto news distribution.

🔥 The Problem
Staying up-to-date with crypto news is hard — especially when you need quality, translated updates aggregated from multiple sources.
Manual curation is time-consuming, and existing solutions are either noisy or lack multilingual support.

🛠️ The Solution

Aggregates live news from CryptoPanic API

Translates and summarizes using GPT (OpenAI API)

Stores original and processed data in MongoDB

Sends formatted updates to a private Telegram channel

Admin Dashboard for editing, prompting, and tracking performance

📈 Tech Stack

Node.js for the backend service

MongoDB for persistent structured data

OpenAI API for smart translations and summarization

Telegram Bot API for content delivery

Next.js for a clean, responsive admin dashboard

Firebase Auth for secure access control

✨ Key Features
🌍 Multilingual translation of crypto news
⚙️ Dynamic prompt control for GPT via admin panel
📊 Stats & analytics on news performance
✏️ Inline editing of AI-generated content
📲 Instant delivery to Telegram

🧪 Behind the Scenes

Built under NDA for a client in the crypto media space

Admin dashboard includes full control over GPT prompts and fallback logic

Emphasis on clean UI, fast iteration, and zero downtime delivery pipeline

Highly modular backend designed for scaling to other industries if needed

🚫 Privacy Note
This is a private, client-specific tool — not publicly accessible.`,
	'bare-minimum-hero': `⭐ Bare Minimum Hero — Project Details
🧠 Chrome Extension That Rewards You for Doing Literally Anything

🚀 About the Project
A sarcastic emotional support extension for burnt-out creatives and minimal-effort champions.
You click the button. You get validation.
No stats. No charts. Just vibes and barely-useful tips.

Built for fun, sanity, and the glory of barely showing up.

🔥 The Problem
Most productivity tools assume you're thriving.
What if you're not? What if doing the bare minimum is already a win?

🛠️ The Solution

A single daily button: press when you've done anything at all

Earn 1 (entire!) hero point and get a sarcastic compliment

Randomized validation quotes, achievement streaks, emergency mode, and meme-grade tips

Everything designed to make minimal effort feel like a personal triumph

Plus a landing page with just enough dopamine to keep you breathing

📈 Tech Stack

Chrome Extension: Vanilla JS, localStorage, no backend

Landing Page: Next.js with TailwindCSS, hosted on Vercel

Multi-language support: English & Russian

Fully offline, no data collection, no guilt

✨ Key Features
🔘 One-button daily interaction
🎉 Emergency Mode for spiral moments
📅 Streak tracking with ironic medals (e.g. "Certified Non-Quitter")
🧠 "Barely Useful Tips" feed
🌐 Beautiful landing page → bareminimumhero.com
💬 Localized in EN / RU
📸 Downloadable share cards for social bragging rights

🧪 Behind the Scenes

Design, icon, branding, and tone done in one chaotic weekend

Writing and copy: brainstormed with ChatGPT, polished with sarcasm

Listed on Chrome Web Store, shared on social media, gathered cult followers

Not trying to "optimize your productivity", just trying to help you not disappear

🔮 What's Next

Firefox version (if 3 people ask)

Share-to-social features with quote cards

Optional dark mode (because ✨aesthetic suffering✨)

Possibly a mobile app for The Button™ (don't tempt me)

📸 Screenshots

Chrome extension UI

Streak mode with ironic medals

Emergency validation monologue

Landing page with star icon and quotes

Example download card`,
	'tagoshi': `💱 Tagoshi — Project Details
🌐 Crypto Price Converter for Real-World Shopping
🧩 Chrome Extension That Brings Web3 Vibes to Web2 Stores

🚀 About the Project
Tagoshi is a Chrome extension that automatically converts product prices on Amazon, eBay, and AliExpress into your favorite cryptocurrencies — directly on the page.
No need for calculators or tab-switching. Just real-time crypto pricing, baked right into your shopping flow.

🔥 The Problem
Crypto enthusiasts often need to mentally (or manually) convert fiat prices into BTC, ETH, etc.
This is tedious, especially when you're living that full degen lifestyle.

🛠️ The Solution

Injects crypto equivalents next to fiat prices on product pages

Uses Binance API for accurate, up-to-date conversion rates

Supports major coins: BTC, ETH, SOL, BNB, XRP

Works seamlessly on Amazon, eBay, and AliExpress

Clean integration — doesn't break the page layout

📈 Tech Stack

Chrome Extension (Vanilla JS)

Binance Public API for live rates

Regex-powered DOM parsing for price detection

Smart caching with auto-refresh every 10 mins

Fully client-side, no data collection

✨ Key Features
🧠 Real-time conversion on product pages
📦 Zero-setup experience — install and go
🎯 Minimalist design that blends with native UI
🔄 Auto-refreshes rates every 10 minutes
🔒 No permissions creep, no tracking

🧪 Behind the Scenes

Built to scratch the "what is this in ETH?" itch

Designed and shipped in a weekend

Maintained as a micro-side-project for crypto-fluent users

Used by people who say "this iPhone is only 0.02 BTC" unironically

🚀 Try It
Chrome Web Store: Tagoshi - Crypto Price Converter`,
	'santa-maria-ios': `📱 Santa Maria – Mobile App (iOS/iPadOS)
🩺 Personalized Health Dashboard for Patients
Built with Flutter · iOS Exclusive · For Santa Maria Clinics

🚀 About the Project
The iOS client app was developed as a companion to the Santa Maria Health Dashboard — providing patients with secure, real-time access to their medical journey, directly from their mobile devices.

This wasn't just an app — it was an extension of the clinic's digital infrastructure, focused on usability, clarity, and smooth communication between patients and healthcare providers.

🔥 The Problem
Many clinics use outdated or fragmented systems that leave patients in the dark about their appointments, procedures, or lab results.
The goal was to bring clarity, trust, and usability to the patient experience — on modern Apple devices.

🛠️ The Solution

📅 Full booking system: view, manage, and cancel appointments

🧪 Access to lab results and medical history

🕓 See upcoming procedures in a clean, structured timeline

🧾 Invoice & billing overview

🔐 Secure authentication and data handling (Firebase)

🎯 Designed for simplicity and clarity, even for less tech-savvy users

📈 Tech Stack

Flutter (iOS/iPadOS only)

Firebase Authentication

REST API backend (Node.js + MongoDB)

Realtime data sync for appointments and status updates

Modular codebase for future expansion (Android, wearables, etc.)

🧪 Behind the Scenes

Built under NDA for a private client

Fully synced with the existing Santa Maria admin dashboard

Delivered alongside the clinic's broader digital transformation initiative

Published on the App Store

🚀 Try It
🔗 Santa Maria Mobile on App Store
(Note: access requires authorized clinic login)`,
	'cheqly-life': `✅ Cheqly.life — Project Details
📊 Visual Goal Tracker for Normal People™
Web App · Beta Mode · Built for personal use, open to the world

🚀 About the Project
Cheqly is a minimal but powerful system for daily goal tracking, inspired by the idea that self-awareness beats motivation — especially when you're just trying to survive modern life.

It's not a habit app. It's not a bullet journal.
It's a spreadsheet you don't hate to look at.

🔥 The Problem
You write your goals. You forget them. Rinse and repeat.
Traditional to-do apps don't help when the real challenge is staying aware of your long-term progress — or noticing that you've ghosted your health column for three weeks straight.

🛠️ The Solution

A grid of life categories (health, work, etc.) × time (day/week/month)

✅ Green = did something

⚪️ White = nothing happened

❌ Red = something went wrong

Auto-aggregation from daily → weekly → monthly

Weekly/monthly review mode to spot patterns and course-correct

Focused on visual feedback, not nagging

📈 Tech Stack

Next.js frontend

Node.js + MongoDB backend

Firebase Auth for login

Tailwind CSS for minimal, responsive design

OpenAI integration (coming later) for reflective insights or auto-highlights

✨ Key Features
📅 Daily + Weekly + Monthly grid view
📈 Visual feedback on goal consistency
🧠 Built-in shame-based motivation (the red cells…)
🔐 Private by default
🧪 Optional AI analysis (coming soon)

🔮 What's Next

Full public launch

Mobile app companion

AI-powered insights

📸 Screenshots
[IMAGE_GALLERY]

🧪 Behind the Scenes

Built for personal accountability

Now evolving into a SaaS tool with future plans for subscription model

Still in beta (invite-only, for now)

UI/UX inspired by old-school Excel with modern brain energy

🌐 Try It (soon)
Website: cheqly.life
(Currently in closed beta — but you can ask nicely)`,
	'focus-buddy': `🧠 Focus Buddy — Project Details
🚫 Block Distractions. ✅ Do Literally Anything Else.
Chrome Extension · Productivity Tool · Built on impulse (as usual)

🚀 About the Project
Focus Buddy is a tiny Chrome extension that gently (or aggressively) blocks websites that keep stealing your time and attention.

No timers. No complicated rules.
Just you, your to-do list, and a digital bouncer for your browser.

🔥 The Problem
We all have "that one site" (or five).
You open a new tab to do something productive… and suddenly it's 40 minutes later, you're reading about raccoons in hats.

🛠️ The Solution

Add any website to your blocklist

Toggle focus mode on/off in one click

Clean, lightweight interface

Works offline, saves your list in Chrome storage

Doesn't scream at you — just quietly prevents dumb decisions

🧰 Tech Stack

Chrome Extension (Manifest v3)

HTML/CSS + vanilla JS

Chrome APIs: webNavigation, storage, host_permissions

Lightweight, no background memory bloat

🧪 Behind the Scenes

Built in a few hours as a side-distraction from procrastinating on another project

Fully privacy-friendly — no data leaves your browser

Meant to be dumb-simple and fast to deploy

✨ Key Features
🛑 One-click website blocking
📃 Local-only blocklist
⚡ Minimal permissions
🎯 Designed for the "I'll just check Twitter real quick" moment
🙅 No analytics. No tracking. No pressure.

🔗 Try It Now
Focus Buddy on Chrome Web Store`
};

// Additional project information
const PROJECT_METADATA: Record<string, {
	releaseDate?: string;
	duration?: string;
	price?: string;
	client?: string;
	status?: string;
}> = {
	'santa-maria-dashboard': {
		releaseDate: 'October 2022',
		duration: '24 months',
		price: 'Commercial project',
		client: 'Private medical clinic',
		status: 'In production'
	},
	'ugh-okay': {
		releaseDate: 'April 2025',
		duration: '3 days',
		status: 'Available on App Store and Google Play'
	},
	'extenswitch': {
		releaseDate: 'April 2025',
		duration: '2 days',
		status: 'Available on Chrome Web Store'
	},
	'zentava': {
		releaseDate: 'In development',
		duration: 'Ongoing',
		status: 'Beta'
	},
	'crypto-news-bot': {
		releaseDate: 'January 2025',
		duration: '3 months',
		price: 'Commercial project',
		client: 'Crypto media company (under NDA)',
		status: 'In production'
	},
	'bare-minimum-hero': {
		releaseDate: 'March 2025',
		duration: '1 weekend',
		status: 'Available on Chrome Web Store'
	},
	'tagoshi': {
		releaseDate: 'February 2025',
		duration: '1 weekend',
		status: 'Available on Chrome Web Store'
	},
	'santa-maria-ios': {
		releaseDate: 'November 2022',
		duration: '6 months',
		price: 'Commercial project',
		client: 'Private medical clinic',
		status: 'Available on App Store (private)'
	},
	'cheqly-life': {
		releaseDate: 'January 2025',
		duration: '3 months',
		price: 'Free (beta)',
		status: 'Beta (invite-only)'
	},
	'focus-buddy': {
		releaseDate: 'October 2024',
		duration: '1 day',
		price: 'Free',
		status: 'Available on Chrome Web Store'
	}
};

interface ProjectContentProps {
	projectId: string;
	isModal?: boolean;
}

// Get content for a project by its id
export const getProjectContent = (projectId: string): { title: string; content: string } => {
	if (PROJECT_CONTENTS[projectId]) {
		return {
			title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/-/g, ' ')} — Project Details`,
			content: PROJECT_CONTENTS[projectId]
		};
	}

	// Default content if the project is not found
	return {
		title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/-/g, ' ')} — Project Details`,
		content: "Detailed information about this project is coming soon."
	};
};

const ProjectContent: React.FC<ProjectContentProps> = ({ projectId, isModal = false }) => {
	const { content } = getProjectContent(projectId);

	// Find the project by its id to get tags and image
	const project = projects.find(p => p.id === projectId);
	const projectTags = project?.tags || [];
	const projectImage = project?.image || '';
	const projectTitle = project?.title || '';

	// Get additional project information
	const metadata = PROJECT_METADATA[projectId] || {};

	const formatContent = (text: string) => {
		// Split text into lines
		const lines = text.split('\n');

		// Check if there is a special marker for images
		const hasImageGallery = lines.some(line => line.includes('[IMAGE_GALLERY]'));

		// Format each line
		const formattedLines = lines.map((line, index) => {
			// Skip the line with the image gallery marker
			if (line.includes('[IMAGE_GALLERY]')) {
				return null;
			}

			// Process headers with emojis
			if (line.match(/^🚀|^🔥|^🛠️|^📈|^🧠|^✨|^🔮|^📸|^🧪|^🚀/)) {
				return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-lab-cyan portfolio:text-indigo-700">{line}</h3>;
			}

			// Process the main header
			if (line.match(/^📱|^🏥|^🧩/)) {
				return <h2 key={index} className="text-2xl font-bold mb-4 text-lab-purple portfolio:text-indigo-800">{line}</h2>;
			}

			// Empty lines are converted to indents
			if (line.trim() === '') {
				return <div key={index} className="h-2"></div>;
			}

			// Regular text
			return <p key={index} className={`mb-2 ${isModal ? 'text-lab-text' : 'text-lab-text'}`}>{line}</p>;
		}).filter(Boolean);

		// For the UghOkay project, add images if there is a marker
		if (projectId === 'ugh-okay' && hasImageGallery) {
			// Find the index of the "Screenshots" header
			const screenshotsIndex = formattedLines.findIndex(
				(el) => React.isValidElement(el) &&
					el.type === 'h3' &&
					typeof el.props === 'object' &&
					el.props !== null &&
					'children' in el.props &&
					typeof el.props.children === 'string' &&
					el.props.children.includes('Screenshots')
			);

			if (screenshotsIndex !== -1) {
				// Insert the gallery after the header
				formattedLines.splice(screenshotsIndex + 1, 0, (
					<div key="image-gallery" className="mt-4 mb-6 grid grid-cols-3 gap-4">
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/UghOkay/UghOkay-Prod-1320-2868-Screen3.jpg"
								alt="UghOkay Screenshot 1"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/UghOkay/UghOkay-Prod-1320-2868-Screen4.jpg"
								alt="UghOkay Screenshot 2"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/UghOkay/UghOkay-Prod-1320-2868-Screen5.jpg"
								alt="UghOkay Screenshot 3"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
					</div>
				));
			}
		}

		// For the Zentava project, add images after the Screenshots section
		if (projectId === 'zentava') {
			// Find the index of the "Screenshots" header
			const screenshotsIndex = formattedLines.findIndex(
				(el) => React.isValidElement(el) &&
					el.type === 'h3' &&
					typeof el.props === 'object' &&
					el.props !== null &&
					'children' in el.props &&
					typeof el.props.children === 'string' &&
					el.props.children.includes('Screenshots')
			);

			if (screenshotsIndex !== -1) {
				// Insert the gallery after the header
				formattedLines.splice(screenshotsIndex + 1, 0, (
					<div key="zentava-gallery" className="mt-4 mb-6 grid grid-cols-2 gap-4">
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/Zentava/Zentava-Screen-02.png"
								alt="Zentava Onboarding"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/Zentava/Zentava-Screen-03.png"
								alt="Zentava Conversation Screen"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
						<div className="overflow-hidden rounded-lg">
							<img
								src="/images/projects/Zentava/Zentava-Screen-04.png"
								alt="Zentava User Dashboard"
								className="w-full h-auto rounded-lg shadow-md"
							/>
						</div>
					</div>
				));
			}
		}

		// For the Cheqly Life project, add images if there is a marker
		if (projectId === 'cheqly-life') {
			const screenshotsIndex = formattedLines.findIndex(
				(el) => React.isValidElement(el) &&
					el.type === 'h3' &&
					typeof el.props === 'object' &&
					el.props !== null &&
					'children' in el.props &&
					typeof el.props.children === 'string' &&
					el.props.children.includes('Screenshots')
			);

			if (screenshotsIndex !== -1) {
				formattedLines.splice(screenshotsIndex + 1, 0, (
					<div key="cheqly-gallery" className="mt-4 mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
						<div className="overflow-hidden rounded-lg">
							<img src="/images/projects/CheqlyLife/Cheqly-Screen-01.png" alt="Cheqly Life Screenshot 1" className="w-full h-auto rounded-lg shadow-md" />
						</div>
						<div className="overflow-hidden rounded-lg">
							<img src="/images/projects/CheqlyLife/Cheqly-Screen-02.png" alt="Cheqly Life Screenshot 2" className="w-full h-auto rounded-lg shadow-md" />
						</div>
						<div className="overflow-hidden rounded-lg">
							<img src="/images/projects/CheqlyLife/Cheqly-Screen-03.png" alt="Cheqly Life Screenshot 3" className="w-full h-auto rounded-lg shadow-md" />
						</div>
						<div className="overflow-hidden rounded-lg">
							<img src="/images/projects/CheqlyLife/Cheqly-Screen-04.png" alt="Cheqly Life Screenshot 4" className="w-full h-auto rounded-lg shadow-md" />
						</div>
						<div className="overflow-hidden rounded-lg">
							<img src="/images/projects/CheqlyLife/Cheqly-Screen-05.png" alt="Cheqly Life Screenshot 5" className="w-full h-auto rounded-lg shadow-md" />
						</div>
					</div>
				));
			}
		}

		return formattedLines;
	};

	return (
		<div className="project-content">
			{/* Project header - image on the left, tags and metadata on the right */}
			<div className="mb-8 flex flex-col md:flex-row gap-6 border-b border-lab-cyan/20 portfolio:border-indigo-100 pb-6">
				{/* Project image */}
				<div className="md:w-1/3">
					{projectImage ? (
						<div className="relative w-full aspect-square rounded-lg overflow-hidden border border-lab-cyan/20 portfolio:border-indigo-100">
							<Image
								src={projectImage}
								alt={`${projectTitle} image`}
								className="object-contain"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								priority
							/>
						</div>
					) : (
						<div className="w-full aspect-square rounded-lg bg-lab-medium/50 flex items-center justify-center border border-lab-cyan/20 portfolio:bg-indigo-50 portfolio:border-indigo-100">
							<span className="text-6xl">{project?.icon || '🔬'}</span>
						</div>
					)}
				</div>

				{/* Tags and metadata */}
				<div className="md:w-2/3">
					{/* Project tags */}
					{projectTags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-6">
							{projectTags.map((tag) => (
								<TagBadge key={tag} tag={tag} />
							))}
						</div>
					)}

					{/* Project metadata */}
					{Object.keys(metadata).length > 0 && (
						<div className="space-y-2 text-sm">
							{metadata.releaseDate && (
								<div className="flex justify-between border-b border-lab-cyan/10 portfolio:border-indigo-50 pb-1">
									<span className="text-lab-muted portfolio:text-indigo-400">Release date:</span>
									<span className="font-medium">{metadata.releaseDate}</span>
								</div>
							)}
							{metadata.duration && (
								<div className="flex justify-between border-b border-lab-cyan/10 portfolio:border-indigo-50 pb-1">
									<span className="text-lab-muted portfolio:text-indigo-400">Development time:</span>
									<span className="font-medium">{metadata.duration}</span>
								</div>
							)}
							{metadata.price && (
								<div className="flex justify-between border-b border-lab-cyan/10 portfolio:border-indigo-50 pb-1">
									<span className="text-lab-muted portfolio:text-indigo-400">Cost:</span>
									<span className="font-medium">{metadata.price}</span>
								</div>
							)}
							{metadata.client && (
								<div className="flex justify-between border-b border-lab-cyan/10 portfolio:border-indigo-50 pb-1">
									<span className="text-lab-muted portfolio:text-indigo-400">Client:</span>
									<span className="font-medium">{metadata.client}</span>
								</div>
							)}
							{metadata.status && (
								<div className="flex justify-between border-b border-lab-cyan/10 portfolio:border-indigo-50 pb-1">
									<span className="text-lab-muted portfolio:text-indigo-400">Status:</span>
									<span className="font-medium">{metadata.status}</span>
								</div>
							)}
						</div>
					)}

					{/* Project links */}
					{project?.links && Object.keys(project.links).length > 0 && (
						<div className="mt-6 flex flex-wrap gap-3">
							{project.links.website && (
								<a
									href={project.links.website}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-1.5 text-sm bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 rounded-lg hover:bg-lab-cyan/20 transition-colors portfolio:bg-indigo-100 portfolio:text-indigo-700 portfolio:border-indigo-200 portfolio:hover:bg-indigo-200"
								>
									Visit website
								</a>
							)}
							{project.links.github && (
								<a
									href={project.links.github}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-1.5 text-sm bg-lab-purple/10 text-lab-purple border border-lab-purple/30 rounded-lg hover:bg-lab-purple/20 transition-colors portfolio:bg-indigo-50 portfolio:text-indigo-600 portfolio:border-indigo-200 portfolio:hover:bg-indigo-100"
								>
									GitHub
								</a>
							)}
							{project.links.appStore && (
								<a
									href={project.links.appStore}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-1.5 text-sm bg-blue-900/10 text-blue-400 border border-blue-700/20 rounded-lg hover:bg-blue-900/20 transition-colors portfolio:bg-blue-50 portfolio:text-blue-600 portfolio:border-blue-200 portfolio:hover:bg-blue-100"
								>
									App Store
								</a>
							)}
							{project.links.googlePlay && (
								<a
									href={project.links.googlePlay}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-1.5 text-sm bg-green-900/10 text-green-400 border border-green-700/20 rounded-lg hover:bg-green-900/20 transition-colors portfolio:bg-green-50 portfolio:text-green-600 portfolio:border-green-200 portfolio:hover:bg-green-100"
								>
									Google Play
								</a>
							)}
							{project.links.blog && (
								<a
									href={project.links.blog}
									target="_blank"
									rel="noopener noreferrer"
									className="px-3 py-1.5 text-sm bg-yellow-900/10 text-yellow-400 border border-yellow-700/20 rounded-lg hover:bg-yellow-900/20 transition-colors portfolio:bg-yellow-50 portfolio:text-yellow-600 portfolio:border-yellow-200 portfolio:hover:bg-yellow-100"
								>
									Blog
								</a>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Main project content */}
			{formatContent(content)}
		</div>
	);
};

export default ProjectContent; 