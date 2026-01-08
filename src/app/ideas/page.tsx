'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import IdeasTransition from '../../components/IdeasTransition';

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
	'fast-feelings-diary': {
		title: 'Fast Feelings Diary',
		description: 'A micro-journal with a widget. Tap. Type. Done. Capture tiny moods before they fade — like that one dream about raccoons.',
		tags: ['Mobile App', 'Productivity', 'Mental Health'],
		status: 'Prototype',
		difficulty: 'Medium',
		likes: 18,
		dislikes: 2
	},
	'inbox-shame': {
		title: 'InboxShame',
		description: 'Shows the number of unread emails and, when you open Gmail, reminds you: "You did this to yourself."',
		tags: ['Chrome Extension', 'Productivity'],
		status: 'Early Research',
		difficulty: 'Easy',
		likes: 15,
		dislikes: 2
	},
	'tab-stretcher': {
		title: 'TabStretcher',
		description: 'If you have more than 10 tabs open, the browser screen subtly "sags" — gentle shaming for tab hoarders.',
		tags: ['Chrome Extension', 'Productivity'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 12,
		dislikes: 3
	},
	'calm-scroll': {
		title: 'CalmScroll',
		description: 'Slows down scrolling on Twitter/Reddit. Optional "Wisdom Mode" that displays random quotes during doomscrolling.',
		tags: ['Chrome Extension', 'Mental Health'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 14,
		dislikes: 4
	},
	'rage-text': {
		title: 'RageText',
		description: 'Write an angry message, hit "Send" — and it disappears into oblivion. Therapy, but cheaper.',
		tags: ['Web App', 'Mental Health'],
		status: 'Draft',
		difficulty: 'Easy',
		likes: 17,
		dislikes: 1
	},
	'mood-ring': {
		title: 'MoodRing.site',
		description: 'Pick your daily mood with an emoji. Get a personal vibe report every 7 days. Fully offline via localStorage.',
		tags: ['Web App', 'Mental Health'],
		status: 'Draft',
		difficulty: 'Easy',
		likes: 16,
		dislikes: 2
	},
	'dm-myself': {
		title: 'DM Myself',
		description: 'Send a message to your future self via email. Choose how many days later you want it to arrive. Emotional time-travel!',
		tags: ['Web App', 'Productivity'],
		status: 'Early Research',
		difficulty: 'Easy',
		likes: 13,
		dislikes: 1
	},
	'one-button-note': {
		title: 'OneButtonNote',
		description: 'A widget that lets you quickly record a voice note or a text thought. One tap. Instant memory saving.',
		tags: ['Mobile App', 'Productivity'],
		status: 'Early Research',
		difficulty: 'Medium',
		likes: 18,
		dislikes: 2
	},
	'habit-but-sarcastic': {
		title: 'HabitButSarcastic',
		description: 'A habit tracker where every achievement is met with sarcastic praise. Motivation... but make it ironic.',
		tags: ['Mobile App', 'Productivity'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 15,
		dislikes: 5
	},
	'offline-vibes': {
		title: 'Offline Vibes',
		description: 'Set your "offline mode" with one button. Notifies selected contacts that you\'re alive, just unavailable.',
		tags: ['Mobile App', 'Mental Health'],
		status: 'Draft',
		difficulty: 'Hard',
		likes: 19,
		dislikes: 2
	},
	'gas-me-not': {
		title: 'GasMeNot',
		description: 'A browser extension showing gas fees in USD — if fees are too high, it simply tells you: "Go touch grass."',
		tags: ['Chrome Extension', 'Crypto'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 14,
		dislikes: 3
	},
	'nft-epitaph-generator': {
		title: 'NFT Epitaph Generator',
		description: 'Enter your failed NFT project name — get a generated digital tombstone. Share it for closure.',
		tags: ['Web App', 'Crypto', 'NFT'],
		status: 'Draft',
		difficulty: 'Easy',
		likes: 11,
		dislikes: 6
	},
	'hodl-panic-button': {
		title: 'HodlPanic Button',
		description: 'One button. When the crypto market crashes, tap it to get a calming stoic quote or a random Elon tweet.',
		tags: ['Web App', 'Crypto', 'Mental Health'],
		status: 'Early Research',
		difficulty: 'Easy',
		likes: 16,
		dislikes: 4
	},
	'gpt-text-spinner': {
		title: 'GPT Text Spinner',
		description: 'Paste your text — get 3 versions: one for LinkedIn, one for Twitter, and one for "Mom, I\'m famous."',
		tags: ['AI', 'Web App', 'Productivity'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 18,
		dislikes: 1
	},
	'existential-gpt': {
		title: 'Existential GPT',
		description: 'An AI chatbot that only responds with deep philosophical questions. Great for self-doubt sessions.',
		tags: ['AI', 'Web App', 'Philosophy'],
		status: 'Early Research',
		difficulty: 'Medium',
		likes: 15,
		dislikes: 5
	},
	'prompt-tarot': {
		title: 'Prompt Tarot',
		description: 'Type your dilemma — get a tarot-style random AI prompt with advice. Mystic meets machine.',
		tags: ['AI', 'Web App'],
		status: 'Draft',
		difficulty: 'Medium',
		likes: 17,
		dislikes: 3
	},
	'stoic-crypto-bot': {
		title: 'Stoic Crypto Bot',
		description: 'Telegram bot that gives stoic advice for crypto traders. → Ask: "BTC dropped 20%, what now?" → Get: "You can\'t control the market. You can control your mind." For inner peace… and maybe outer profit.',
		tags: ['Telegram Bot', 'Crypto', 'Philosophy'],
		status: 'Early Research',
		difficulty: 'Medium',
		likes: 12,
		dislikes: 3
	},
	'nft-wisdom-series': {
		title: 'NFT Wisdom Series',
		description: 'Philosophical quotes as NFT art. Seneca meets Satoshi. Minted. Minimal. Metaphysical. "Greed is your worst trade."',
		tags: ['NFT', 'Crypto', 'Art', 'Philosophy'],
		status: 'Draft',
		difficulty: 'Hard',
		likes: 9,
		dislikes: 4
	},
	'zen-crypto-quotes': {
		title: 'Zen Crypto Quotes',
		description: 'A one-page site with daily stoic quotes applied to the crypto chaos. No login. No charts. Just peace. Click. Breathe. Cope.',
		tags: ['Web App', 'Crypto', 'Philosophy'],
		status: 'Draft',
		difficulty: 'Easy',
		likes: 15,
		dislikes: 2
	},
	'karma-token': {
		title: 'Karma Token',
		description: 'A social crypto token for good vibes only. Earn tokens for helping others, being ethical, or just not rage-quitting Telegram. 100% pointless. 100% meaningful.',
		tags: ['Crypto', 'Social', 'Blockchain'],
		status: 'Early Research',
		difficulty: 'Nightmare fuel',
		likes: 11,
		dislikes: 5
	},
	'stoic-crypto-course': {
		title: 'Stoic Crypto Course (For Dummies)',
		description: 'Micro-course on staying sane in crypto. Topics: Control what you can, Chill when market crashes, Greed is not alpha. Distributed via Gumroad, not the blockchain.',
		tags: ['Course', 'Crypto', 'Philosophy'],
		status: 'On Hold',
		difficulty: 'Medium',
		likes: 14,
		dislikes: 3
	},
	'philosophy-generator': {
		title: 'Philosophy Generator',
		description: 'A website that gives you existential advice on crypto problems. "Should I sell?" → "Freedom is a burden. Choose wisely." "ETH is falling" → "Detach from outcomes." Build it with HTML, soul, and sarcasm.',
		tags: ['Web App', 'Crypto', 'Philosophy'],
		status: 'Draft',
		difficulty: 'Easy',
		likes: 8,
		dislikes: 1
	},
	'auto-gpt-twitter-coach': {
		title: 'Auto-GPT Twitter Coach',
		description: 'A tool that writes tweets for you. Pick a topic → Pick an account → Get spicy AI content. Because why think when GPT can vibe for you?',
		tags: ['AI', 'Tool', 'Social Media'],
		status: 'Early Research',
		difficulty: 'Hard',
		likes: 13,
		dislikes: 7
	},
	'you-but-posthumous': {
		title: 'You, but Posthumous',
		description: 'AI journal that learns your personality. App asks you deep questions. Logs them. Trains on them. Recreates your mind someday. (For science… or spooky nostalgia.)',
		tags: ['AI', 'Personal', 'Existential'],
		status: 'Early Research',
		difficulty: 'Nightmare fuel',
		likes: 19,
		dislikes: 8
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
	const [showIntro, setShowIntro] = useState(true);
	const [contentVisible, setContentVisible] = useState(false);
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

				// Update ideas with API vote data using functional update
				setIdeasList(currentIdeasList => {
					const updatedIdeas = { ...currentIdeasList };
					Object.keys(apiVotes).forEach(ideaId => {
						if (updatedIdeas[ideaId]) {
							updatedIdeas[ideaId].likes = apiVotes[ideaId].likes;
							updatedIdeas[ideaId].dislikes = apiVotes[ideaId].dislikes;
						}
					});
					return updatedIdeas;
				});

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

	// Get the one idea for Currently Brewing
	const brewingIdea = ['fast-feelings-diary'].map(id => [id, ideasList[id]] as [string, IdeaInfo]);

	// Get the rest for Future Experiments
	const futureIdeas = Object.entries(ideasList).filter(([id]) => id !== 'fast-feelings-diary');

	return (
		<div className="flex flex-col min-h-screen relative overflow-hidden portfolio:bg-white animate-in fade-in duration-1000">
			{showIntro && (
				<div className="fixed inset-0 z-50">
					<IdeasTransition
						onStartExit={() => setContentVisible(true)}
						onComplete={() => setShowIntro(false)}
					/>
				</div>
			)}
			<main className={`flex-grow pt-10 pb-20 px-4 relative z-10 portfolio:bg-white transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
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
										<span className="portfolio:hidden">VOTING_SOON</span>
										<span className="hidden portfolio:inline">Voting coming soon!</span>
									</>
								)}
							</div>
						</div>
						<div className="text-lab-text font-mono portfolio:text-indigo-700 portfolio:font-sans space-y-6">
							{brewingIdea.map(([id, idea]) => (
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
											<div
												className="flex items-center space-x-1 px-1.5 py-1 rounded transition-colors text-lab-muted cursor-not-allowed opacity-60 portfolio:text-gray-500"
												aria-label="Like this idea (coming soon)"
											>
												<span role="img" aria-hidden="true">👍</span>
												<span>{idea.likes}</span>
											</div>
											<div
												className="flex items-center space-x-1 px-1.5 py-1 rounded transition-colors text-lab-muted cursor-not-allowed opacity-60 portfolio:text-gray-500"
												aria-label="Dislike this idea (coming soon)"
											>
												<span role="img" aria-hidden="true">👎</span>
												<span>{idea.dislikes}</span>
											</div>
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
								{futureIdeas.map(([id, idea]) => (
									<li key={id} className="flex items-start gap-3">
										<span role="img" aria-hidden="true" className="text-lab-purple portfolio:text-portfolio-accent text-xl mt-1">
											{idea.tags.includes('Chrome Extension') ? '🧩' :
												idea.tags.includes('Mobile App') ? '📱' :
													idea.tags.includes('Web App') ? '🌐' :
														idea.tags.includes('Crypto') || idea.tags.includes('Token') ? '🪙' :
															idea.tags.includes('Zen') || idea.tags.includes('Stoic') ? '🧘' :
																idea.tags.includes('NFT') ? '🎨' :
																	idea.tags.includes('Philosophy') ? '📚' :
																		idea.tags.includes('AI') ? '🤖' :
																			idea.tags.includes('Posthumous') ? '🧬' : '💡'}
										</span>
										<div>
											<div className="flex items-center gap-2 mb-1">
												<h3 className="font-bold">{idea.title}</h3>
												<StatusBadge status={idea.status} />
												<DifficultyBadge difficulty={idea.difficulty} />
											</div>
											<p>{idea.description}</p>
											<div className="flex items-center mt-2 space-x-3">
												<div
													className="flex items-center space-x-1 px-1.5 py-1 rounded text-xs text-lab-muted cursor-not-allowed opacity-60 portfolio:text-gray-500"
													aria-label="Like this idea (coming soon)"
												>
													<span role="img" aria-hidden="true">👍</span>
													<span>{idea.likes}</span>
												</div>
												<div
													className="flex items-center space-x-1 px-1.5 py-1 rounded text-xs text-lab-muted cursor-not-allowed opacity-60 portfolio:text-gray-500"
													aria-label="Dislike this idea (coming soon)"
												>
													<span role="img" aria-hidden="true">👎</span>
													<span>{idea.dislikes}</span>
												</div>
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
		</div>
	);
} 