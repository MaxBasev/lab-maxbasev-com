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
				<div className="w-full h-52 relative border-b border-lab-cyan/20 overflow-hidden">
					<div className="absolute inset-0 bg-lab-dark/40 z-10 group-hover:bg-lab-dark/20 transition-all duration-300"></div>
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-110"
						priority={project.id === 'ugh-okay'}
					/>
				</div>
			)}
			<div className="p-6 relative">
				{/* Lab tube decoration top-right */}
				<div className="absolute -top-3 right-4 w-1 h-6 bg-lab-cyan/20 rounded-full"></div>

				<div className="flex items-start justify-between mb-3">
					{!project.image && (
						<div className="text-4xl bg-lab-dark w-14 h-14 flex items-center justify-center rounded-xl border border-lab-cyan/20 shadow-neon-cyan/20" aria-hidden="true">
							{project.icon}
						</div>
					)}
				</div>

				<h2 className={`text-xl font-mono font-bold tracking-tight mb-2 ${isDeadProject ? 'line-through text-lab-muted' : 'text-white group-hover:text-lab-cyan group-hover:neon-text transition-all duration-300'}`}>
					{project.title}
				</h2>

				<p className="text-lab-text dark:text-lab-text text-sm mb-4 min-h-[40px]">
					{project.description}
				</p>

				<p className="text-lab-muted text-xs italic mb-5 font-mono">
					{project.id === 'ugh-okay'
						? '> Built to save my own sanity from endless scrolling.'
						: '> Another experiment from the lab.'}
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