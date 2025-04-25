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
		<div className="angled-card bg-lab-medium/90 rounded-xl shadow-lg hover:shadow-neon-cyan transition-all duration-300 hover:scale-[1.01] border border-lab-cyan/20 overflow-hidden relative group">
			{project.image && (
				<div className="w-full h-60 relative border-b border-lab-cyan/20 overflow-hidden portfolio:border-gray-100">
					<div className="absolute inset-0 bg-lab-dark/40 z-10 group-hover:bg-lab-dark/20 transition-all duration-300 portfolio:bg-black/0 portfolio:group-hover:bg-black/5"></div>
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-110"
						priority={project.id === 'ugh-okay'}
					/>
				</div>
			)}
			<div className="p-6 relative portfolio:p-7">
				{/* Lab tube decoration top-right - hidden in portfolio mode */}
				<div className="absolute -top-3 right-4 w-1 h-6 bg-lab-cyan/20 rounded-full portfolio:hidden"></div>

				<div className="flex items-start justify-between mb-3">
					{!project.image && (
						<div className="text-4xl bg-lab-dark w-14 h-14 flex items-center justify-center rounded-xl border border-lab-cyan/20 shadow-neon-cyan/20 portfolio:bg-gray-50 portfolio:border-gray-100 portfolio:shadow-none portfolio:text-2xl" aria-hidden="true">
							{project.icon}
						</div>
					)}
				</div>

				<h2 className={`text-xl font-mono font-bold tracking-tight mb-2 ${isDeadProject
					? 'line-through text-lab-muted portfolio:text-gray-400'
					: 'text-white group-hover:text-lab-cyan group-hover:neon-text transition-all duration-300 portfolio:text-indigo-900 portfolio:group-hover:text-indigo-700 portfolio:font-sans portfolio:project-title'
					}`}>
					{project.title}
				</h2>

				<p className={`text-lab-text text-sm mb-4 min-h-[40px] portfolio:text-indigo-700 portfolio:font-sans portfolio:card-text`}>
					{project.description}
				</p>

				<div className="flex flex-wrap gap-2 mb-4">
					{project.tags.map((tag) => (
						<TagBadge key={tag} tag={tag} />
					))}
				</div>

				<ProjectLinks links={project.links} />

				{/* View Project button - only shown in portfolio mode */}
				{project.links.website && (
					<div className="mt-5 hidden portfolio:block">
						<a href={project.links.website}
							target="_blank"
							rel="noopener noreferrer"
							className="view-project-btn">
							View Project
						</a>
					</div>
				)}
			</div>
		</div>
	);
}; 