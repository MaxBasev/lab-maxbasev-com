"use client";

import React from 'react';
import { ProjectTag } from '../types';

type TagFilterProps = {
	tags: ProjectTag[];
	selectedTags: ProjectTag[];
	onChange: (tags: ProjectTag[]) => void;
};

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onChange }) => {
	const toggleTag = (tag: ProjectTag) => {
		if (selectedTags.includes(tag)) {
			onChange(selectedTags.filter((t) => t !== tag));
		} else {
			onChange([...selectedTags, tag]);
		}
	};

	const clearFilters = () => {
		onChange([]);
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-lab-cyan text-sm font-mono portfolio:text-indigo-800 portfolio:font-sans portfolio:font-medium">
					Filter by reagent type:
				</h2>
				{selectedTags.length > 0 && (
					<button
						onClick={clearFilters}
						className="text-xs text-lab-text hover:text-lab-cyan portfolio:text-indigo-600 portfolio:hover:text-indigo-900"
					>
						Clear filters
					</button>
				)}
			</div>
			<div className="flex flex-wrap gap-2 tag-filter">
				{tags.map((tag) => (
					<button
						key={tag}
						onClick={() => toggleTag(tag)}
						className={`
							text-xs px-2 py-0.5 rounded font-mono 
							${selectedTags.includes(tag)
								? 'bg-lab-cyan/20 text-white border border-lab-cyan/50'
								: 'bg-lab-medium/80 text-lab-text border border-lab-cyan/10 hover:border-lab-cyan/30'
							} 
							transition-all duration-200
							portfolio:font-sans portfolio:text-sm 
                            ${selectedTags.includes(tag)
								? 'portfolio:bg-indigo-600 portfolio:text-white portfolio:border-0'
								: 'portfolio:bg-white portfolio:text-indigo-700 portfolio:border portfolio:border-indigo-200 portfolio:hover:border-indigo-400'
							}
                            portfolio:px-3 portfolio:py-1 portfolio:rounded-md portfolio:shadow-sm
						`}
					>
						{tag}
					</button>
				))}
			</div>
		</div>
	);
}; 