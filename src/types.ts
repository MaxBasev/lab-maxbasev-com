export type ProjectTag =
	| 'Mobile App'
	| 'SaaS'
	| 'Pet Project'
	| 'Chrome Extension'
	| 'Tool'
	| 'Freelance Work'
	| 'Dead Project'
	| 'Web App'
	| 'Beta'
	| 'AI-powered'
	| 'Crypto'
	| 'iOS App';

export type ProjectLinks = {
	github?: string;
	website?: string;
	appStore?: string;
	googlePlay?: string;
	blog?: string;
};

export type Project = {
	id: string;
	title: string;
	description: string;
	icon?: string;
	image?: string;
	tags: ProjectTag[];
	links: ProjectLinks;
};

// Helper to get tag colors based on tag
export const getTagColor = (tag: ProjectTag): { bg: string; text: string } => {
	const labModeColors: Record<ProjectTag, { bg: string; text: string }> = {
		'Mobile App': { bg: 'bg-purple-900/30', text: 'text-purple-200' },
		'SaaS': { bg: 'bg-blue-900/30', text: 'text-blue-200' },
		'Pet Project': { bg: 'bg-green-900/30', text: 'text-green-200' },
		'Chrome Extension': { bg: 'bg-yellow-900/30', text: 'text-yellow-200' },
		'Tool': { bg: 'bg-red-900/30', text: 'text-red-200' },
		'Freelance Work': { bg: 'bg-pink-900/30', text: 'text-pink-200' },
		'Dead Project': { bg: 'bg-gray-800/30', text: 'text-gray-400' },
		'Web App': { bg: 'bg-blue-900/30', text: 'text-blue-200' },
		'Beta': { bg: 'bg-indigo-900/30', text: 'text-indigo-200' },
		'AI-powered': { bg: 'bg-violet-900/30', text: 'text-violet-200' },
		'Crypto': { bg: 'bg-amber-900/30', text: 'text-amber-200' },
		'iOS App': { bg: 'bg-purple-900/30', text: 'text-purple-200' },
		// 'Healthcare': { bg: 'bg-emerald-900/30', text: 'text-emerald-200' },
	};

	// Portfolio mode tags use colors that correspond to the tag type with better contrast
	const portfolioModeColors: Record<ProjectTag, { bg: string; text: string }> = {
		'Mobile App': { bg: 'portfolio:bg-purple-100', text: 'portfolio:text-purple-800' },
		'SaaS': { bg: 'portfolio:bg-blue-100', text: 'portfolio:text-blue-800' },
		'Pet Project': { bg: 'portfolio:bg-green-100', text: 'portfolio:text-green-800' },
		'Chrome Extension': { bg: 'portfolio:bg-yellow-100', text: 'portfolio:text-yellow-800' },
		'Tool': { bg: 'portfolio:bg-red-100', text: 'portfolio:text-red-800' },
		'Freelance Work': { bg: 'portfolio:bg-pink-100', text: 'portfolio:text-pink-800' },
		'Dead Project': { bg: 'portfolio:bg-gray-200', text: 'portfolio:text-gray-700' },
		'Web App': { bg: 'portfolio:bg-blue-100', text: 'portfolio:text-blue-800' },
		'Beta': { bg: 'portfolio:bg-indigo-100', text: 'portfolio:text-indigo-800' },
		'AI-powered': { bg: 'portfolio:bg-violet-100', text: 'portfolio:text-violet-800' },
		'Crypto': { bg: 'portfolio:bg-amber-100', text: 'portfolio:text-amber-800' },
		'iOS App': { bg: 'portfolio:bg-purple-100', text: 'portfolio:text-purple-800' },
		// 'Healthcare': { bg: 'portfolio:bg-emerald-100', text: 'portfolio:text-emerald-800' },
	};

	const labColors = labModeColors[tag];
	const portfolioColors = portfolioModeColors[tag];

	return {
		bg: `${labColors.bg} ${portfolioColors.bg}`,
		text: `${labColors.text} ${portfolioColors.text}`,
	};
}; 