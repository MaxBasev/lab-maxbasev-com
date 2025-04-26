import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Project } from '../types';
import { TagBadge } from './TagBadge';
import { ProjectLinks } from './ProjectLinks';
import ProjectModal from './ProjectModal';

type ProjectCardProps = {
	project: Project;
};

// Подробный контент о проекте Ugh Okay
const UGH_OKAY_CONTENT = `📱 Ugh Okay — The Button That Saves Your Brain
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
Or, you know... keep doomscrolling. (No pressure.)`;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const router = useRouter();
	const isDeadProject = project.tags.includes('Dead Project');
	const isUghOkay = project.id === 'ugh-okay';
	const [modalOpen, setModalOpen] = useState(false);

	const handleReadMore = () => {
		if (isUghOkay) {
			// Используем роутинг для проекта Ugh Okay
			router.push(`/cases/${project.id}`);
			setModalOpen(true);
		}
	};

	return (
		<>
			<div className="angled-card bg-lab-medium/90 rounded-xl shadow-lg hover:shadow-neon-cyan transition-all duration-300 hover:scale-[1.01] border border-lab-cyan/20 overflow-hidden relative group">
				{project.image && (
					<div className="w-full h-60 relative border-b border-lab-cyan/20 overflow-hidden portfolio:border-gray-100">
						<div className="absolute inset-0 bg-lab-dark/40 z-10 group-hover:bg-lab-dark/20 transition-all duration-300 portfolio:bg-black/0 portfolio:group-hover:bg-black/5"></div>
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-110"
							priority={isUghOkay}
						/>
					</div>
				)}
				<div className="p-6 relative portfolio:p-7">
					{/* Lab tube decoration top-right - hidden in portfolio mode */}
					<div className="absolute -top-3 right-4 w-1 h-6 bg-lab-cyan/20 rounded-full portfolio:hidden"></div>

					<div className="flex items-start justify-between mb-3">
						{!project.image && (
							<div className="text-4xl bg-lab-dark w-14 h-14 flex items-center justify-center rounded-xl border border-lab-cyan/20 shadow-neon-cyan/20 portfolio:bg-gray-50 portfolio:border-gray-100 portfolio:shadow-none portfolio:text-2xl" aria-hidden="true">
								{project.icon}
							</div>
						)}
					</div>

					<h2 className={`text-xl font-mono font-bold tracking-tight mb-2 ${isDeadProject
						? 'line-through text-lab-muted portfolio:text-gray-400'
						: 'text-white group-hover:text-lab-cyan group-hover:neon-text transition-all duration-300 portfolio:text-indigo-900 portfolio:group-hover:text-indigo-700 portfolio:font-sans portfolio:project-title'
						}`}>
						{project.title}
					</h2>

					<p className={`text-lab-text text-sm mb-4 min-h-[40px] portfolio:text-indigo-700 portfolio:font-sans portfolio:card-text`}>
						{project.description}
					</p>

					<div className="flex flex-wrap gap-2 mb-4">
						{project.tags.map((tag) => (
							<TagBadge key={tag} tag={tag} />
						))}
					</div>

					<div className="flex justify-between items-center">
						<ProjectLinks links={project.links} />

						{isUghOkay && (
							<button
								onClick={handleReadMore}
								className="px-3 py-1.5 bg-lab-purple/10 text-lab-purple border border-lab-purple/30 rounded-lg hover:bg-lab-purple/20 transition-colors text-sm font-mono portfolio:bg-indigo-100 portfolio:text-indigo-700 portfolio:border-indigo-200 portfolio:hover:bg-indigo-200 portfolio:font-sans ml-2"
							>
								<span className="portfolio:hidden">READ_MORE</span>
								<span className="hidden portfolio:inline">Read more</span>
							</button>
						)}
					</div>

					{/* View Project button - only shown in portfolio mode */}
					{project.links.website && (
						<div className="mt-5 hidden portfolio:block">
							<a href={project.links.website}
								target="_blank"
								rel="noopener noreferrer"
								className="view-project-btn">
								View Project
							</a>
						</div>
					)}
				</div>
			</div>

			{isUghOkay && (
				<ProjectModal
					isOpen={modalOpen}
					onClose={() => {
						setModalOpen(false);
						// При закрытии модального окна возвращаемся на главную страницу
						router.push('/');
					}}
					title="Ugh Okay — Project Details"
					content={UGH_OKAY_CONTENT}
				/>
			)}
		</>
	);
}; 