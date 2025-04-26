'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type IdeaId = 'ai-writing' | 'task-manager' | 'snippet-manager';
type IdeaRating = {
	likes: number;
	dislikes: number;
	userChoice: 'like' | 'dislike' | null;
};
type IdeasRatings = Record<IdeaId, IdeaRating>;

const initialRatings: IdeasRatings = {
	'ai-writing': { likes: 14, dislikes: 3, userChoice: null },
	'task-manager': { likes: 23, dislikes: 5, userChoice: null },
	'snippet-manager': { likes: 9, dislikes: 2, userChoice: null }
};

export default function Ideas() {
	const [ratings, setRatings] = useState<IdeasRatings>(initialRatings);

	// Загрузка данных из localStorage при инициализации
	useEffect(() => {
		const savedRatings = localStorage.getItem('ideasRatings');
		if (savedRatings) {
			try {
				const parsedRatings = JSON.parse(savedRatings) as IdeasRatings;
				setRatings(parsedRatings);
			} catch (e) {
				console.error('Ошибка при загрузке рейтингов:', e);
			}
		}
	}, []);

	// Сохранение данных в localStorage при изменении
	useEffect(() => {
		localStorage.setItem('ideasRatings', JSON.stringify(ratings));
	}, [ratings]);

	const handleVote = (id: IdeaId, vote: 'like' | 'dislike') => {
		setRatings(prev => {
			const currentIdea = prev[id];

			// Если пользователь уже голосовал так же - отменяем его голос
			if (currentIdea.userChoice === vote) {
				const updatedRating = {
					...currentIdea,
					[`${vote}s`]: currentIdea[`${vote}s`] - 1,
					userChoice: null
				};
				return { ...prev, [id]: updatedRating };
			}

			// Если пользователь голосовал противоположно - меняем его голос
			if (currentIdea.userChoice !== null && currentIdea.userChoice !== vote) {
				const oppositeVote = vote === 'like' ? 'dislike' : 'like';
				const updatedRating = {
					...currentIdea,
					[`${vote}s`]: currentIdea[`${vote}s`] + 1,
					[`${oppositeVote}s`]: currentIdea[`${oppositeVote}s`] - 1,
					userChoice: vote
				};
				return { ...prev, [id]: updatedRating };
			}

			// Если пользователь голосует впервые
			const updatedRating = {
				...currentIdea,
				[`${vote}s`]: currentIdea[`${vote}s`] + 1,
				userChoice: vote
			};
			return { ...prev, [id]: updatedRating };
		});
	};

	return (
		<div className="flex flex-col min-h-screen relative overflow-hidden portfolio:bg-white">
			<main className="flex-grow pt-10 pb-20 px-4 relative z-10 portfolio:bg-white">
				<div className="max-w-4xl mx-auto">
					<div className="mb-12 relative">
						{/* Lab decoration elements */}
						<div className="absolute -top-5 left-1/4 w-1 h-20 bg-lab-cyan/20 rounded-full portfolio:hidden"></div>
						<div className="absolute -top-2 right-1/4 w-1 h-10 bg-lab-purple/20 rounded-full portfolio:hidden"></div>

						<h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-center text-white portfolio:text-indigo-900">
							<span role="img" aria-label="Ideas" className="mr-3 animate-pulse">💡</span>
							Future <span className="text-lab-cyan portfolio:text-[#1fbd89] neon-text portfolio:no-underline">Ideas</span>
						</h1>
						<p className="text-lg text-center text-lab-text max-w-2xl mx-auto font-mono portfolio:text-indigo-700 portfolio:font-sans">
							Experimental concepts and upcoming projects in the pipeline
						</p>
					</div>

					<div className="bg-lab-medium/30 rounded-xl border border-lab-cyan/20 p-6 mb-8 portfolio:bg-white portfolio:border-indigo-100 portfolio:shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-mono font-bold text-lab-cyan portfolio:text-indigo-900 portfolio:font-sans">
								Currently Brewing
							</h2>
							<div className="text-sm text-lab-text font-mono portfolio:text-indigo-600 portfolio:font-sans">
								<span className="portfolio:hidden">VOTE_ON_IDEAS</span>
								<span className="hidden portfolio:inline">Vote on ideas you like!</span>
							</div>
						</div>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans space-y-6">
							<div className="p-4 border border-lab-cyan/20 rounded-lg portfolio:border-indigo-100">
								<div className="flex justify-between items-start">
									<h3 className="text-xl font-bold text-lab-purple portfolio:text-portfolio-accent mb-2">AI Writing Assistant</h3>
									<div className="flex items-center space-x-4">
										<button
											onClick={() => handleVote('ai-writing', 'like')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['ai-writing'].userChoice === 'like'
													? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
													: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50'
												}`}
											aria-label="Like this idea"
										>
											<span role="img" aria-hidden="true">👍</span>
											<span>{ratings['ai-writing'].likes}</span>
										</button>
										<button
											onClick={() => handleVote('ai-writing', 'dislike')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['ai-writing'].userChoice === 'dislike'
													? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
													: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50'
												}`}
											aria-label="Dislike this idea"
										>
											<span role="img" aria-hidden="true">👎</span>
											<span>{ratings['ai-writing'].dislikes}</span>
										</button>
									</div>
								</div>
								<p className="mb-2">
									A browser extension that helps with writing clearer, more concise text. Uses AI to suggest improvements without changing your voice.
								</p>
								<div className="flex flex-wrap gap-2 mt-3">
									<span className="px-2 py-1 bg-purple-900/30 text-purple-200 rounded-md text-xs portfolio:bg-purple-100 portfolio:text-purple-800">Chrome Extension</span>
									<span className="px-2 py-1 bg-violet-900/30 text-violet-200 rounded-md text-xs portfolio:bg-violet-100 portfolio:text-violet-800">AI-powered</span>
									<span className="px-2 py-1 bg-amber-900/30 text-amber-200 rounded-md text-xs portfolio:bg-amber-100 portfolio:text-amber-800">Early Design</span>
								</div>
							</div>

							<div className="p-4 border border-lab-cyan/20 rounded-lg portfolio:border-indigo-100">
								<div className="flex justify-between items-start">
									<h3 className="text-xl font-bold text-lab-purple portfolio:text-portfolio-accent mb-2">Minimal Task Manager</h3>
									<div className="flex items-center space-x-4">
										<button
											onClick={() => handleVote('task-manager', 'like')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['task-manager'].userChoice === 'like'
													? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
													: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50'
												}`}
											aria-label="Like this idea"
										>
											<span role="img" aria-hidden="true">👍</span>
											<span>{ratings['task-manager'].likes}</span>
										</button>
										<button
											onClick={() => handleVote('task-manager', 'dislike')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['task-manager'].userChoice === 'dislike'
													? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
													: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50'
												}`}
											aria-label="Dislike this idea"
										>
											<span role="img" aria-hidden="true">👎</span>
											<span>{ratings['task-manager'].dislikes}</span>
										</button>
									</div>
								</div>
								<p className="mb-2">
									Ultra-lightweight task manager with focus on simplicity and keyboard shortcuts. No accounts, no cloud sync, just local tasks.
								</p>
								<div className="flex flex-wrap gap-2 mt-3">
									<span className="px-2 py-1 bg-blue-900/30 text-blue-200 rounded-md text-xs portfolio:bg-blue-100 portfolio:text-blue-800">Web App</span>
									<span className="px-2 py-1 bg-red-900/30 text-red-200 rounded-md text-xs portfolio:bg-red-100 portfolio:text-red-800">Tool</span>
									<span className="px-2 py-1 bg-green-900/30 text-green-200 rounded-md text-xs portfolio:bg-green-100 portfolio:text-green-800">In Development</span>
								</div>
							</div>

							<div className="p-4 border border-lab-cyan/20 rounded-lg portfolio:border-indigo-100">
								<div className="flex justify-between items-start">
									<h3 className="text-xl font-bold text-lab-purple portfolio:text-portfolio-accent mb-2">Code Snippet Manager</h3>
									<div className="flex items-center space-x-4">
										<button
											onClick={() => handleVote('snippet-manager', 'like')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['snippet-manager'].userChoice === 'like'
													? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
													: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50'
												}`}
											aria-label="Like this idea"
										>
											<span role="img" aria-hidden="true">👍</span>
											<span>{ratings['snippet-manager'].likes}</span>
										</button>
										<button
											onClick={() => handleVote('snippet-manager', 'dislike')}
											className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings['snippet-manager'].userChoice === 'dislike'
													? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
													: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50'
												}`}
											aria-label="Dislike this idea"
										>
											<span role="img" aria-hidden="true">👎</span>
											<span>{ratings['snippet-manager'].dislikes}</span>
										</button>
									</div>
								</div>
								<p className="mb-2">
									VS Code extension for saving, organizing and reusing code snippets with smart context detection.
								</p>
								<div className="flex flex-wrap gap-2 mt-3">
									<span className="px-2 py-1 bg-yellow-900/30 text-yellow-200 rounded-md text-xs portfolio:bg-yellow-100 portfolio:text-yellow-800">VS Code Extension</span>
									<span className="px-2 py-1 bg-red-900/30 text-red-200 rounded-md text-xs portfolio:bg-red-100 portfolio:text-red-800">Tool</span>
									<span className="px-2 py-1 bg-indigo-900/30 text-indigo-200 rounded-md text-xs portfolio:bg-indigo-100 portfolio:text-indigo-800">Concept</span>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-lab-medium/30 rounded-xl border border-lab-cyan/20 p-6 mb-8 portfolio:bg-white portfolio:border-indigo-100 portfolio:shadow-sm">
						<h2 className="text-2xl font-mono font-bold mb-4 text-lab-cyan portfolio:text-indigo-900 portfolio:font-sans">
							Future Experiments
						</h2>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans">
							<ul className="space-y-4">
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">⏱️</span>
									<div>
										<h3 className="font-bold">Deep Work Timer</h3>
										<p>A timer application that enforces focus sessions using psychological techniques and gentle accountability.</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">📚</span>
									<div>
										<h3 className="font-bold">Reading List Tracker</h3>
										<p>Browser extension that helps organize articles, blogs and papers to read later, with built-in comprehension scoring.</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">🤖</span>
									<div>
										<h3 className="font-bold">Personal AI Assistant</h3>
										<p>Privacy-focused assistant for personal knowledge management and retrieval.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div className="bg-lab-medium/30 rounded-xl border border-lab-cyan/20 p-6 mb-8 portfolio:bg-white portfolio:border-indigo-100 portfolio:shadow-sm">
						<h2 className="text-2xl font-mono font-bold mb-4 text-lab-cyan portfolio:text-indigo-900 portfolio:font-sans">
							Submit Your Idea
						</h2>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans space-y-4">
							<p>
								Have an idea for a tool or experiment you&apos;d like to see built? I&apos;m always open to collaboration and interesting suggestions!
							</p>
							<div className="flex flex-col sm:flex-row gap-4 mt-4">
								<Link
									href="mailto:ideas@maxbasev.com?subject=Project%20Idea"
									className="px-4 py-3 bg-lab-purple/10 text-lab-purple border border-lab-purple/30 rounded-lg hover:bg-lab-purple/20 transition-colors font-mono text-center portfolio:bg-[#1fbd89]/10 portfolio:text-[#1fbd89] portfolio:border-[#1fbd89]/30 portfolio:hover:bg-[#1fbd89]/20 portfolio:font-sans"
								>
									<span className="portfolio:hidden">SUBMIT_IDEA</span>
									<span className="hidden portfolio:inline">Submit Your Idea</span>
								</Link>
							</div>
						</div>
					</div>

					<div className="text-center mt-8">
						<Link
							href="/"
							className="inline-block px-4 py-2 bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 rounded-lg hover:bg-lab-cyan/20 transition-colors font-mono portfolio:bg-transparent portfolio:text-portfolio-accent portfolio:border-portfolio-accent portfolio:hover:bg-portfolio-accent portfolio:hover:text-white portfolio:font-sans"
						>
							<span className="portfolio:hidden">BACK_TO_LAB</span>
							<span className="hidden portfolio:inline">Back to Projects</span>
						</Link>
					</div>
				</div>
			</main>

			<footer className="bg-lab-darker/80 backdrop-blur-sm py-8 border-t border-lab-cyan/20 relative z-10 portfolio:bg-white portfolio:border-indigo-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center">
						<p className="text-center text-lab-muted font-mono portfolio:text-indigo-700/80 portfolio:font-sans">
							Powered by sleepless nights and way too much coffee.
						</p>
						<div className="flex gap-4 mt-3">
							<a
								href="https://github.com/MaxBasev"
								target="_blank"
								rel="noopener noreferrer"
								className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
								aria-label="GitHub"
							>
								<span role="img" aria-hidden="true" className="text-xl">🧪</span>
								<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
							</a>
							<a
								href="mailto:contact@maxbasev.com"
								className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
								aria-label="Email"
							>
								<span role="img" aria-hidden="true" className="text-xl">⚗️</span>
								<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
							</a>
						</div>
						<div className="mt-3 text-xs text-lab-muted/50 font-mono portfolio:text-indigo-500/80 portfolio:font-sans">
							© {new Date().getFullYear()} Max Basev Labs
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
} 