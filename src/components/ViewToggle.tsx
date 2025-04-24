import React from 'react';

export type ViewMode = 'grid' | 'list';

type ViewToggleProps = {
	viewMode: ViewMode;
	onChange: (mode: ViewMode) => void;
};

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
	return (
		<div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
			<button
				type="button"
				className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'grid'
						? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400'
						: 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
					}`}
				onClick={() => onChange('grid')}
			>
				<span className="mr-2" role="img" aria-hidden="true">📱</span>
				Cards
			</button>

			<button
				type="button"
				className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${viewMode === 'list'
						? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400'
						: 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
					}`}
				onClick={() => onChange('list')}
			>
				<span className="mr-2" role="img" aria-hidden="true">📋</span>
				List
			</button>
		</div>
	);
}; 