'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type IdeaId = 'ai-writing' | 'task-manager' | 'snippet-manager';
type IdeaStatus = 'Draft' | 'Early Research' | 'Prototype' | 'On Hold';
type IdeaDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Nightmare fuel';

type IdeaRating = {
	likes: number;
	dislikes: number;
	userChoice: 'like' | 'dislike' | null;
};

type IdeaInfo = {
	title: string;
	description: string;
	tags: string[];
	status: IdeaStatus;
	difficulty: IdeaDifficulty;
};

type IdeasRatings = Record<IdeaId, IdeaRating>;
type IdeasData = Record<IdeaId, IdeaInfo>;

const initialIdeasData: IdeasData = {
	'ai-writing': {
		title: 'AI Writing Assistant',
		description: 'A browser extension that helps with writing clearer, more concise text. Uses AI to suggest improvements without changing your voice.',
		tags: ['Chrome Extension', 'AI-powered', 'Early Design'],
		status: 'Early Research',
		difficulty: 'Medium'
	},
	'task-manager': {
		title: 'Minimal Task Manager',
		description: 'Ultra-lightweight task manager with focus on simplicity and keyboard shortcuts. No accounts, no cloud sync, just local tasks.',
		tags: ['Web App', 'Tool', 'In Development'],
		status: 'Prototype',
		difficulty: 'Easy'
	},
	'snippet-manager': {
		title: 'Code Snippet Manager',
		description: 'VS Code extension for saving, organizing and reusing code snippets with smart context detection.',
		tags: ['VS Code Extension', 'Tool', 'Concept'],
		status: 'Draft',
		difficulty: 'Nightmare fuel'
	}
};

const initialRatings: IdeasRatings = {
	'ai-writing': { likes: 14, dislikes: 3, userChoice: null },
	'task-manager': { likes: 23, dislikes: 5, userChoice: null },
	'snippet-manager': { likes: 9, dislikes: 2, userChoice: null }
};

// Компонент для отображения статуса идеи
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

// Компонент для отображения сложности идеи
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
	const [ratings, setRatings] = useState<IdeasRatings>(initialRatings);
	const [ideasData] = useState<IdeasData>(initialIdeasData);
	const [isLoading, setIsLoading] = useState(false);

	// Загрузка данных с API при инициализации
	useEffect(() => {
		const fetchRatings = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/get-votes');
				if (!response.ok) {
					throw new Error('Failed to fetch votes');
				}

				const apiVotes = await response.json();

				// Преобразуем данные API в формат, используемый в компоненте
				const newRatings: IdeasRatings = { ...initialRatings };

				// Обновляем только значения голосов из API
				Object.keys(newRatings).forEach(ideaId => {
					if (apiVotes[ideaId]) {
						newRatings[ideaId as IdeaId].likes = apiVotes[ideaId].likes;
						newRatings[ideaId as IdeaId].dislikes = apiVotes[ideaId].dislikes;
					}
				});

				// Восстанавливаем локально сохраненный userChoice
				const savedUserChoices = localStorage.getItem('ideasUserChoices');
				if (savedUserChoices) {
					const userChoices = JSON.parse(savedUserChoices);
					Object.keys(userChoices).forEach(ideaId => {
						if (newRatings[ideaId as IdeaId]) {
							newRatings[ideaId as IdeaId].userChoice = userChoices[ideaId];
						}
					});
				}

				setRatings(newRatings);
			} catch (error) {
				console.error('Error fetching votes:', error);
				// Если API недоступен, загружаем из localStorage как запасной вариант
				const savedRatings = localStorage.getItem('ideasRatings');
				if (savedRatings) {
					try {
						const parsedRatings = JSON.parse(savedRatings) as IdeasRatings;
						setRatings(parsedRatings);
					} catch (e) {
						console.error('Ошибка при загрузке рейтингов из localStorage:', e);
					}
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchRatings();
	}, []);

	// Сохранение локального выбора пользователя
	useEffect(() => {
		// Извлекаем только userChoice из каждой идеи
		const userChoices: Record<string, 'like' | 'dislike' | null> = {};
		Object.keys(ratings).forEach(ideaId => {
			userChoices[ideaId] = ratings[ideaId as IdeaId].userChoice;
		});

		localStorage.setItem('ideasUserChoices', JSON.stringify(userChoices));
	}, [ratings]);

	const handleVote = async (id: IdeaId, vote: 'like' | 'dislike') => {
		const currentIdea = ratings[id];

		// Определяем, какая операция выполняется
		const action: 'like' | 'dislike' = vote;

		// Если пользователь голосует за тот же вариант, отменяем действие
		if (currentIdea.userChoice === vote) {
			return; // Отмена голоса не поддерживается API, поэтому просто отменяем действие
		}

		// Проверяем, не голосовал ли пользователь ранее
		if (currentIdea.userChoice !== null && currentIdea.userChoice !== vote) {
			// Если голосовал противоположно, то нужно будет синхронизировать
			// Но в нашем API пока нет возможности отменить/изменить голос
			// Поэтому просто добавляем новый голос
		}

		// Оптимистичное обновление UI
		setRatings(prev => {
			const updated = { ...prev };

			// Если пользователь голосовал противоположно - меняем его голос
			if (updated[id].userChoice !== null && updated[id].userChoice !== vote) {
				const oppositeVote = vote === 'like' ? 'dislike' : 'like';
				updated[id] = {
					...updated[id],
					[`${vote}s`]: updated[id][`${vote}s`] + 1,
					[`${oppositeVote}s`]: updated[id][`${oppositeVote}s`] - 1,
					userChoice: vote
				};
			} else {
				// Если пользователь голосует впервые или так же
				updated[id] = {
					...updated[id],
					[`${vote}s`]: updated[id][`${vote}s`] + 1,
					userChoice: vote
				};
			}

			return updated;
		});

		// Вызов API
		try {
			const response = await fetch('/api/update-votes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ideaId: id, action })
			});

			if (!response.ok) {
				throw new Error('Failed to update vote');
			}

			const result = await response.json();
			console.log('Vote updated successfully:', result);
		} catch (error) {
			console.error('Error updating vote:', error);
			// Если API вызов не удался, можно отменить оптимистичное обновление
			// Но для простоты не реализуем это сейчас
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
							{Object.entries(ideasData).map(([id, idea]) => (
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
												onClick={() => handleVote(id as IdeaId, 'like')}
												className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings[id as IdeaId].userChoice === 'like'
													? 'bg-lab-cyan/20 text-lab-cyan portfolio:bg-green-100 portfolio:text-green-700'
													: 'hover:bg-lab-cyan/10 text-lab-muted portfolio:hover:bg-green-50'
													}`}
												aria-label="Like this idea"
											>
												<span role="img" aria-hidden="true">👍</span>
												<span>{ratings[id as IdeaId].likes}</span>
											</button>
											<button
												onClick={() => handleVote(id as IdeaId, 'dislike')}
												className={`flex items-center space-x-1 px-1.5 py-1 rounded transition-colors ${ratings[id as IdeaId].userChoice === 'dislike'
													? 'bg-lab-purple/20 text-lab-purple portfolio:bg-red-100 portfolio:text-red-700'
													: 'hover:bg-lab-purple/10 text-lab-muted portfolio:hover:bg-red-50'
													}`}
												aria-label="Dislike this idea"
											>
												<span role="img" aria-hidden="true">👎</span>
												<span>{ratings[id as IdeaId].dislikes}</span>
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
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">⏱️</span>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-bold">Deep Work Timer</h3>
											<StatusBadge status="Draft" />
											<DifficultyBadge difficulty="Medium" />
										</div>
										<p>A timer application that enforces focus sessions using psychological techniques and gentle accountability.</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">📚</span>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-bold">Reading List Tracker</h3>
											<StatusBadge status="On Hold" />
											<DifficultyBadge difficulty="Hard" />
										</div>
										<p>Browser extension that helps organize articles, blogs and papers to read later, with built-in comprehension scoring.</p>
									</div>
								</li>
								<li className="flex items-start gap-3">
									<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">🤖</span>
									<div>
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-bold">Personal AI Assistant</h3>
											<StatusBadge status="Early Research" />
											<DifficultyBadge difficulty="Nightmare fuel" />
										</div>
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