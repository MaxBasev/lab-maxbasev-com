"use client";

import React from 'react';
import { FiGrid, FiList } from 'react-icons/fi';

export type ViewMode = 'grid' | 'list';

type ViewToggleProps = {
	viewMode: ViewMode;
	onChange: (mode: ViewMode) => void;
};

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
	return (
		<div className="flex items-center rounded-lg p-0.5 border border-white/5 portfolio:bg-white portfolio:border-portfolio-accent/20 portfolio:shadow-none">
			<button
				onClick={() => onChange('grid')}
				className={`px-2 py-1 rounded flex items-center transition-all ${viewMode === 'grid'
					? 'bg-white/10 shadow text-white portfolio:bg-portfolio-accent/10 portfolio:text-portfolio-accent'
					: 'text-gray-400 hover:text-gray-300 portfolio:text-portfolio-accent/50 portfolio:hover:text-portfolio-accent'
					}`}
				aria-label="Grid view"
			>
				<FiGrid className="h-5 w-5" />
			</button>
			<button
				onClick={() => onChange('list')}
				className={`px-2 py-1 rounded flex items-center transition-all ${viewMode === 'list'
					? 'bg-white/10 shadow text-white portfolio:bg-portfolio-accent/10 portfolio:text-portfolio-accent'
					: 'text-gray-400 hover:text-gray-300 portfolio:text-portfolio-accent/50 portfolio:hover:text-portfolio-accent'
					}`}
				aria-label="List view"
			>
				<FiList className="h-5 w-5" />
			</button>
		</div>
	);
}; 