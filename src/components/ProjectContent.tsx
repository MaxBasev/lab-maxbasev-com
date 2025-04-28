'use client';

import React from 'react';

// Содержимое по умолчанию для проектов
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
Home screen
Add/Edit tasks screen
About screen
Empty state screen

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
Sign up for the waitlist at Zentava.life and be among the first to meet your AI mentor.`
};

interface ProjectContentProps {
	projectId: string;
	isModal?: boolean;
}

// Получаем контент для проекта по его id
export const getProjectContent = (projectId: string): { title: string; content: string } => {
	if (PROJECT_CONTENTS[projectId]) {
		return {
			title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/-/g, ' ')} — Project Details`,
			content: PROJECT_CONTENTS[projectId]
		};
	}

	// Контент по умолчанию, если проект не найден
	return {
		title: `${projectId.charAt(0).toUpperCase() + projectId.slice(1).replace(/-/g, ' ')} — Project Details`,
		content: "Detailed information about this project is coming soon."
	};
};

const ProjectContent: React.FC<ProjectContentProps> = ({ projectId, isModal = false }) => {
	const { content } = getProjectContent(projectId);

	const formatContent = (text: string) => {
		// Разбиваем текст на строки
		const lines = text.split('\n');

		// Форматируем каждую строку
		return lines.map((line, index) => {
			// Обрабатываем заголовки с эмодзи
			if (line.match(/^🚀|^🔥|^🛠️|^📈|^🧠|^✨|^🔮|^📸|^🧪|^🚀/)) {
				return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-lab-cyan portfolio:text-indigo-700">{line}</h3>;
			}

			// Обрабатываем основной заголовок
			if (line.match(/^📱/)) {
				return <h2 key={index} className="text-2xl font-bold mb-4 text-lab-purple portfolio:text-indigo-800">{line}</h2>;
			}

			// Пустые строки преобразуем в отступы
			if (line.trim() === '') {
				return <div key={index} className="h-2"></div>;
			}

			// Обычный текст
			return <p key={index} className={`mb-2 ${isModal ? 'text-lab-text' : 'text-lab-text'}`}>{line}</p>;
		});
	};

	return <div className="project-content">{formatContent(content)}</div>;
};

export default ProjectContent; 