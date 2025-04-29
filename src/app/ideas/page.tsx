'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type IdeaStatus = 'Draft' | 'Early Research' | 'Prototype' | 'On Hold';
type IdeaDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Nightmare fuel';

type IdeaInfo = {
	title: string;
	description: string;
	tags: string[];
	status: IdeaStatus;
	difficulty: IdeaDifficulty;
	likes: number;
	dislikes: number;
};

type IdeasData = Record<string, IdeaInfo>;
type VoteChoice = 'like' | 'dislike' | null;
type UserChoices = Record<string, VoteChoice>;

const ideasData: IdeasData = {
	'ai-writing': {
		title: 'AI Writing Assistant',
		description: 'A browser extension that helps with writing clearer, more concise text. Uses AI to suggest improvements without changing your voice.',
		tags: ['Chrome Extension', 'AI-powered', 'Early Design'],
		status: 'Early Research',
		difficulty: 'Medium',
		likes: 14,
		dislikes: 3
	},
	'task-manager': {
		title: 'Minimal Task Manager',
		description: 'Ultra-lightweight task manager with focus on simplicity and keyboard shortcuts. No accounts, no cloud sync, just local tasks.',
		tags: ['Web App', 'Tool', 'In Development'],
		status: 'Prototype',
		difficulty: 'Easy',
		likes: 23,
		dislikes: 5
	},
	'snippet-manager': {
		title: 'Code Snippet Manager',
		description: 'VS Code extension for saving, organizing and reusing code snippets with smart context detection.',
		tags: ['VS Code Extension', 'Tool', 'Concept'],
		status: 'Draft',
		difficulty: 'Nightmare fuel',
		likes: 9,
		dislikes: 2
	},
	'deep-work-timer': {
		title: 'Deep Work Timer',
		description: 'A timer application that enforces focus sessions using psychological techniques and gentle accountability.',
		tags: ['Desktop App', 'Productivity', 'Early Concept'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 7,
		dislikes: 1
	},
	'reading-list': {
		title: 'Reading List Tracker',
		description: 'Browser extension that helps organize articles, blogs and papers to read later, with built-in comprehension scoring.',
		tags: ['Browser Extension', 'Content', 'Research Phase'],
		status: 'On Hold',
		difficulty: 'Hard',
		likes: 15,
		dislikes: 2
	},
	'personal-ai': {
		title: 'Personal AI Assistant',
		description: 'Privacy-focused assistant for personal knowledge management and retrieval.',
		tags: ['AI', 'Desktop App', 'Research'],
		status: 'Early Research',
		difficulty: 'Nightmare fuel',
		likes: 19,
		dislikes: 4
	}
};

// Component for displaying idea status
const StatusBadge = ({ status }: { status: IdeaStatus }) => {
	const getStatusStyles = () => {
		switch (status) {
			case 'Draft':
				return 'bg-gray-800/40 text-gray-300 border-gray-600 portfolio:bg-gray-100 portfolio:text-gray-700 portfolio:border-gray-300';
			case 'Early Research':
				return 'bg-indigo-900/40 text-indigo-300 border-indigo-700 portfolio:bg-indigo-100 portfolio:text-indigo-700 portfolio:border-indigo-300';
			case 'Prototype':
				return 'bg-green-900/40 text-green-300 border-green-700 portfolio:bg-green-100 portfolio:text-green-700 portfolio:border-green-300';
			case 'On Hold':
				return 'bg-amber-900/40 text-amber-300 border-amber-700 portfolio:bg-amber-100 portfolio:text-amber-700 portfolio:border-amber-300';
			default:
				return 'bg-gray-800/40 text-gray-300 border-gray-600 portfolio:bg-gray-100 portfolio:text-gray-700 portfolio:border-gray-300';
		}
	};

	return (
		<div className={`text-xs px-2 py-1 rounded-full border ${getStatusStyles()} font-mono portfolio:font-sans inline-flex items-center`}>
			<span className="w-1.5 h-1.5 rounded-full mr-1 bg-current"></span>
			{status}
		</div>
	);
};

// Component for displaying idea difficulty
const DifficultyBadge = ({ difficulty }: { difficulty: IdeaDifficulty }) => {
	const getDifficultyStyles = () => {
		switch (difficulty) {
			case 'Easy':
				return 'bg-emerald-900/30 text-emerald-300 portfolio:bg-emerald-100 portfolio:text-emerald-700';
			case 'Medium':
				return 'bg-blue-900/30 text-blue-300 portfolio:bg-blue-100 portfolio:text-blue-700';
			case 'Hard':
				return 'bg-orange-900/30 text-orange-300 portfolio:bg-orange-100 portfolio:text-orange-700';
			case 'Nightmare fuel':
				return 'bg-red-900/30 text-red-300 portfolio:bg-red-100 portfolio:text-red-700';
			default:
				return 'bg-gray-800/30 text-gray-300 portfolio:bg-gray-100 portfolio:text-gray-700';
		}
	};

	return (
		<div className={`text-xs px-2 py-1 rounded-full ${getDifficultyStyles()} font-mono portfolio:font-sans`}>
			{difficulty === 'Nightmare fuel' ? '🔥 ' : ''}
			{difficulty}
		</div>
	);
};

export default function Ideas() {
	const [ideasList, setIdeasList] = useState<IdeasData>(ideasData);
	const [userChoices, setUserChoices] = useState<UserChoices>({});
	const [isLoading, setIsLoading] = useState(false);

	// Load votes from API on initialization
	useEffect(() => {
		const fetchVotes = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/votes', {
					cache: 'no-store',
					headers: {
						'Pragma': 'no-cache',
						'Cache-Control': 'no-cache'
					}
				});

				if (!response.ok) {
					throw new Error('Failed to fetch votes');
				}

				const apiVotes = await response.json();

				// Update ideas with API vote data
				const updatedIdeas = { ...ideasList };
				Object.keys(apiVotes).forEach(ideaId => {
					if (updatedIdeas[ideaId]) {
						updatedIdeas[ideaId].likes = apiVotes[ideaId].likes;
						updatedIdeas[ideaId].dislikes = apiVotes[ideaId].dislikes;
					}
				});

				setIdeasList(updatedIdeas);

				// Load user choices from localStorage
				const savedUserChoices = localStorage.getItem('ideasUserChoices');
				if (savedUserChoices) {
					setUserChoices(JSON.parse(savedUserChoices));
				}
			} catch (error) {
				console.error('Error fetching votes:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVotes();
	}, []);

	// Save user choices to localStorage when they change
	useEffect(() => {
		if (Object.keys(userChoices).length > 0) {
			localStorage.setItem('ideasUserChoices', JSON.stringify(userChoices));
		}
	}, [userChoices]);

	const handleVote = async (id: string, vote: 'like' | 'dislike') => {
		const currentChoice = userChoices[id];

		// If user has already voted the same way, do nothing
		if (currentChoice === vote) {
			return;
		}

		// Optimistic UI update
		const updatedIdeas = { ...ideasList };
		const updatedChoices = { ...userChoices };

		// If changing vote from opposite choice
		if (currentChoice && currentChoice !== vote) {
			// Decrement previous choice, increment new choice
			const oppositeVote = vote === 'like' ? 'dislike' : 'like';
			updatedIdeas[id][`${oppositeVote}s`] -= 1;
			updatedIdeas[id][`${vote}s`] += 1;
		} else {
			// First time voting 
			updatedIdeas[id][`${vote}s`] += 1;
		}

		// Update user choice
		updatedChoices[id] = vote;

		// Update state
		setIdeasList(updatedIdeas);
		setUserChoices(updatedChoices);

		// Call API to update vote
		try {
			const response = await fetch('/api/votes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Pragma': 'no-cache',
					'Cache-Control': 'no-cache'
				},
				cache: 'no-store',
				body: JSON.stringify({ ideaId: id, action: vote })
			});

			if (!response.ok) {
				throw new Error('Failed to update vote');
			}

			// API response could be used to sync state if needed
			const result = await response.json();
			console.log('Vote updated successfully:', result);
		} catch (error) {
			console.error('Error updating vote:', error);
			// Revert optimistic update on error
			setIdeasList(ideasList);
			setUserChoices(userChoices);
		}
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
								{isLoading ? (
									<span>Loading...</span>
								) : (
									<>
										<span className="portfolio:hidden">VOTE_ON_IDEAS</span>
										<span className="hidden portfolio:inline">Vote on ideas you like!</span>
									</>
								)}
							</div>
						</div>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans space-y-6">
							{Object.entries(ideasList).slice(0, 3).map(([id, idea]) => (
								<div key={id} className="p-4 border border-lab-cyan/20 rounded-lg portfolio:border-indigo-100">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-xl font-bold text-lab-purple portfolio:text-portfolio-accent mb-2">
												{idea.title}
											</h3>
											<div className="flex flex-wrap gap-2 mb-3">
												<StatusBadge status={idea.status} />
												<DifficultyBadge difficulty={idea.difficulty} />
											</div>
										</div>
										<div className="flex items-center space-x-4 ml-4">
											<button
												onClick={() => handleVote(id, 'like')}
												className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${userChoices[id] === 'like'
													? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
													: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50 portfolio:text-green-700'
													}`}
												aria-label="Like this idea"
											>
												<span role="img" aria-hidden="true">👍</span>
												<span>{idea.likes}</span>
											</button>
											<button
												onClick={() => handleVote(id, 'dislike')}
												className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${userChoices[id] === 'dislike'
													? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
													: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50 portfolio:text-red-700'
													}`}
												aria-label="Dislike this idea"
											>
												<span role="img" aria-hidden="true">👎</span>
												<span>{idea.dislikes}</span>
											</button>
										</div>
									</div>
									<p className="mb-3">
										{idea.description}
									</p>
									<div className="flex flex-wrap gap-2 mt-3">
										{idea.tags.map((tag, index) => (
											<span key={index} className="px-2 py-1 bg-purple-900/30 text-purple-200 rounded-md text-xs portfolio:bg-purple-100 portfolio:text-purple-800">
												{tag}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-lab-medium/30 rounded-xl border border-lab-cyan/20 p-6 mb-8 portfolio:bg-white portfolio:border-indigo-100 portfolio:shadow-sm">
						<h2 className="text-2xl font-mono font-bold mb-4 text-lab-cyan portfolio:text-indigo-900 portfolio:font-sans">
							Future Experiments
						</h2>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans">
							<ul className="space-y-4">
								{Object.entries(ideasList).slice(3).map(([id, idea]) => (
									<li key={id} className="flex items-start gap-3">
										<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">
											{idea.title.includes('Timer') ? '⏱️' :
												idea.title.includes('Reading') ? '📚' :
													idea.title.includes('AI') ? '🤖' : '💡'}
										</span>
										<div>
											<div className="flex items-center gap-2 mb-1">
												<h3 className="font-bold">{idea.title}</h3>
												<StatusBadge status={idea.status} />
												<DifficultyBadge difficulty={idea.difficulty} />
											</div>
											<p>{idea.description}</p>
											<div className="flex items-center mt-2 space-x-3">
												<button
													onClick={() => handleVote(id, 'like')}
													className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors text-xs ${userChoices[id] === 'like'
														? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
														: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50 portfolio:text-green-700'
														}`}
													aria-label="Like this idea"
												>
													<span role="img" aria-hidden="true">👍</span>
													<span>{idea.likes}</span>
												</button>
												<button
													onClick={() => handleVote(id, 'dislike')}
													className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors text-xs ${userChoices[id] === 'dislike'
														? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
														: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50 portfolio:text-red-700'
														}`}
													aria-label="Dislike this idea"
												>
													<span role="img" aria-hidden="true">👎</span>
													<span>{idea.dislikes}</span>
												</button>
											</div>
										</div>
									</li>
								))}
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