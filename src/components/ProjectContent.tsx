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

🧪 Behind the Scenes
Designed in Figma in one evening.
Copywriting and button ideas brainstormed with ChatGPT.
Built over a few lazy weekends.
Launched on IndieHackers and ProductHunt for fun, not fame.

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
Landing page
Onboarding / Sign-in
Conversation screen (prototype)
User dashboard (WIP)

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
Install on Chrome and experience instant control over your extensions!`
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