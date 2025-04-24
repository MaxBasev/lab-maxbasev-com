import React from 'react';
import { ProjectTag, getTagColor } from '../types';

type TagBadgeProps = {
	tag: ProjectTag;
};

// Emoji mapping for each tag
const tagEmojis: Record<ProjectTag, string> = {
	'Mobile App': '📱',
	'SaaS': '💊',
	'Pet Project': '🧸',
	'Chrome Extension': '🧩',
	'Tool': '🧩',
	'Freelance Work': '👔',
	'Dead Project': '👾'
};

// Chemical formula mapping for each tag
const chemicalFormulas: Record<ProjectTag, string> = {
	'Mobile App': 'Mb-Ap₂',
	'SaaS': 'SaS₃',
	'Pet Project': 'Pt₃',
	'Chrome Extension': 'CrEx',
	'Tool': 'To₂',
	'Freelance Work': 'Fr₄',
	'Dead Project': 'De₂d'
};

export const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
	const { bg, text } = getTagColor(tag);

	const isDeadProject = tag === 'Dead Project';
	const emoji = tagEmojis[tag];
	const formula = chemicalFormulas[tag];

	return (
		<span
			className={`
				text-xs font-mono font-medium px-2.5 py-1 rounded-md
				${bg} ${text} 
				${isDeadProject ? 'line-through' : ''}
				inline-flex items-center border border-opacity-30 shadow-sm
				hover:shadow-neon-cyan transition-all duration-300
			`}
		>
			<span className="mr-1">{emoji}</span>
			{formula}
		</span>
	);
}; 