export type ProjectTag =
	| 'Mobile App'
	| 'SaaS'
	| 'Pet Project'
	| 'Chrome Extension'
	| 'Tool'
	| 'Freelance Work'
	| 'Dead Project';

export type ProjectLinks = {
	website?: string;
	appStore?: string;
	googlePlay?: string;
	github?: string;
	blog?: string;
};

export type Project = {
	id: string;
	title: string;
	description: string;
	icon: string;
	image?: string;
	tags: ProjectTag[];
	links: ProjectLinks;
};

export const getTagColor = (tag: ProjectTag): { bg: string; text: string } => {
	switch (tag) {
		case 'Mobile App':
			return { bg: 'bg-pink-100', text: 'text-pink-800' };
		case 'SaaS':
			return { bg: 'bg-blue-100', text: 'text-blue-800' };
		case 'Pet Project':
			return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
		case 'Chrome Extension':
			return { bg: 'bg-purple-100', text: 'text-purple-800' };
		case 'Tool':
			return { bg: 'bg-green-100', text: 'text-green-800' };
		case 'Freelance Work':
			return { bg: 'bg-gray-100', text: 'text-gray-700' };
		case 'Dead Project':
			return { bg: 'bg-neutral-200', text: 'text-neutral-600' };
	}
}; 