import React from 'react';
import Image from 'next/image';
import { Project } from '../types';
import { TagBadge } from './TagBadge';
import { ProjectLinks } from './ProjectLinks';

type ProjectListItemProps = {
	project: Project;
};

export const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
	return (
		<div className="space-y-4">
			{projects.map((project) => (
				<ProjectListItem key={project.id} project={project} />
			))}
		</div>
	);
};

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project }) => {
	const isDeadProject = project.tags.includes('Dead Project');

	return (
		<div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
			{project.image ? (
				<div className="w-16 h-16 relative shrink-0 rounded-xl overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover"
					/>
				</div>
			) : (
				<div
					className="text-4xl bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center rounded-xl shrink-0"
					aria-hidden="true"
				>
					{project.icon}
				</div>
			)}

			<div className="flex-1 min-w-0">
				<h2 className={`text-lg font-bold tracking-tight ${isDeadProject ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
					{project.title}
				</h2>
				<p className="text-gray-600 dark:text-gray-300 text-sm">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-2 mt-2">
					{project.tags.map((tag) => (
						<TagBadge key={tag} tag={tag} />
					))}
				</div>
			</div>

			<ProjectLinks links={project.links} />
		</div>
	);
}; 