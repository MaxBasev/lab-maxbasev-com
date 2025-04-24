import React from 'react';
import { ProjectTag, getTagColor } from '../types';

type TagFilterProps = {
	tags: ProjectTag[];
	selectedTags: ProjectTag[];
	onChange: (tags: ProjectTag[]) => void;
};

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onChange }) => {
	const handleTagClick = (tag: ProjectTag) => {
		if (selectedTags.includes(tag)) {
			onChange(selectedTags.filter((t) => t !== tag));
		} else {
			onChange([...selectedTags, tag]);
		}
	};

	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => {
				const isSelected = selectedTags.includes(tag);
				const { bg, text } = getTagColor(tag);

				return (
					<button
						key={tag}
						onClick={() => handleTagClick(tag)}
						className={`
							py-1.5 px-4 rounded-lg text-sm font-medium transition-all duration-200
							${isSelected
								? `${bg} ${text} shadow-md`
								: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
						`}
					>
						{tag}
					</button>
				);
			})}

			{selectedTags.length > 0 && (
				<button
					onClick={() => onChange([])}
					className="py-1.5 px-4 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200 flex items-center gap-1"
				>
					<span>Clear</span>
					<span className="font-bold">×</span>
				</button>
			)}
		</div>
	);
}; 