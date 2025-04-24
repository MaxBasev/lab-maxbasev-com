import React from 'react';
import Image from 'next/image';
import { Project } from '../types';
import { TagBadge } from './TagBadge';
import { ProjectLinks } from './ProjectLinks';

type ProjectCardProps = {
	project: Project;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const isDeadProject = project.tags.includes('Dead Project');

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/10 overflow-hidden border border-gray-100 dark:border-gray-700">
			{project.image && (
				<div className="w-full h-48 relative">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
						priority={project.id === 'ugh-okay'}
					/>
				</div>
			)}
			<div className="p-6">
				<div className="flex items-start justify-between mb-3">
					{!project.image && (
						<div className="text-4xl bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center rounded-xl" aria-hidden="true">
							{project.icon}
						</div>
					)}
				</div>

				<h2 className={`text-xl font-bold tracking-tight mb-2 ${isDeadProject ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
					{project.title}
				</h2>

				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 min-h-[40px]">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-2 mb-4">
					{project.tags.map((tag) => (
						<TagBadge key={tag} tag={tag} />
					))}
				</div>

				<ProjectLinks links={project.links} />
			</div>
		</div>
	);
}; 