import React from 'react';
import { ProjectTag, getTagColor } from '../types';

type TagBadgeProps = {
	tag: ProjectTag;
};

export const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => {
	const { bg, text } = getTagColor(tag);

	const isDeadProject = tag === 'Dead Project';

	return (
		<span
			className={`
				text-xs font-medium px-2.5 py-1 rounded-full 
				${bg} ${text} 
				${isDeadProject ? 'line-through' : ''}
				inline-flex items-center shadow-sm
			`}
		>
			{tag}
		</span>
	);
}; 