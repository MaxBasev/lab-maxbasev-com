"use client";

import React from 'react';
import { ProjectTag } from '../types';

type TagBadgeProps = {
	tag: ProjectTag;
};

export const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
	// Convert tag to a color based on its string
	let badgeClass = '';

	// Lab mode - different colors for different tags
	if (tag === 'Mobile App') {
		badgeClass = 'bg-purple-900/30 text-purple-300 border-purple-700/30 portfolio:bg-portfolio-tag-purple-bg portfolio:text-portfolio-tag-purple-text';
	} else if (tag === 'iOS App') {
		badgeClass = 'bg-pink-900/30 text-pink-300 border-pink-700/30 portfolio:bg-portfolio-tag-pink-bg portfolio:text-portfolio-tag-pink-text';
	} else if (tag === 'SaaS') {
		badgeClass = 'bg-blue-900/30 text-blue-300 border-blue-700/30 portfolio:bg-portfolio-tag-blue-bg portfolio:text-portfolio-tag-blue-text';
	} else if (tag === 'Web App') {
		badgeClass = 'bg-sky-900/30 text-sky-300 border-sky-700/30 portfolio:bg-portfolio-tag-blue-bg portfolio:text-portfolio-tag-blue-text';
	} else if (tag === 'Tool') {
		badgeClass = 'bg-green-900/30 text-green-300 border-green-700/30 portfolio:bg-portfolio-tag-green-bg portfolio:text-portfolio-tag-green-text';
	} else if (tag === 'Chrome Extension') {
		badgeClass = 'bg-red-900/30 text-red-300 border-red-700/30 portfolio:bg-portfolio-tag-pink-bg portfolio:text-portfolio-tag-pink-text';
	} else if (tag === 'Pet Project') {
		badgeClass = 'bg-yellow-900/30 text-yellow-300 border-yellow-700/30 portfolio:bg-portfolio-tag-yellow-bg portfolio:text-portfolio-tag-yellow-text';
	} else if (tag === 'Freelance Work') {
		badgeClass = 'bg-fuchsia-900/30 text-fuchsia-300 border-fuchsia-700/30 portfolio:bg-portfolio-tag-purple-bg portfolio:text-portfolio-tag-purple-text';
	} else if (tag === 'Dead Project') {
		badgeClass = 'bg-gray-900/30 text-gray-400 border-gray-700/30 portfolio:bg-portfolio-tag-gray-bg portfolio:text-portfolio-tag-gray-text';
	} else if (tag === 'Beta') {
		badgeClass = 'bg-indigo-900/30 text-indigo-300 border-indigo-700/30 portfolio:bg-portfolio-tag-indigo-bg portfolio:text-portfolio-tag-indigo-text';
	} else if (tag === 'AI-powered') {
		badgeClass = 'bg-violet-900/30 text-violet-300 border-violet-700/30 portfolio:bg-portfolio-tag-purple-bg portfolio:text-portfolio-tag-purple-text';
	} else if (tag === 'Crypto') {
		badgeClass = 'bg-amber-900/30 text-amber-300 border-amber-700/30 portfolio:bg-portfolio-tag-yellow-bg portfolio:text-portfolio-tag-yellow-text';
	} else {
		// Default color
		badgeClass = 'bg-lab-surface text-lab-text border-white/10 portfolio:bg-portfolio-tag-gray-bg portfolio:text-portfolio-tag-gray-text';
	}

	return (
		<span className={`
			inline-block px-2 py-1 text-xs font-mono rounded-md border 
			${badgeClass}
			portfolio:font-sans portfolio:text-xs portfolio:rounded-md portfolio:border-0 portfolio:tag-badge
		`}>
			{tag}
		</span>
	);
}; 