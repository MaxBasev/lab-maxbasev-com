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
		<div className="flex items-center gap-4 p-5 bg-lab-medium/90 rounded-xl shadow-md hover:shadow-neon-cyan transition-all duration-300 border border-lab-cyan/20 group relative overflow-hidden">
			{/* Lab test tube decorations */}
			<div className="absolute -bottom-3 right-6 w-1 h-10 bg-lab-cyan/20 rounded-full"></div>
			<div className="absolute top-0 left-6 w-1 h-6 bg-lab-cyan/20 rounded-full"></div>

			{project.image ? (
				<div className="w-16 h-16 relative shrink-0 rounded-xl overflow-hidden border border-lab-cyan/20">
					<div className="absolute inset-0 bg-lab-dark/40 z-10 group-hover:bg-lab-dark/20 transition-all duration-300"></div>
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-110"
					/>
				</div>
			) : (
				<div
					className="text-4xl bg-lab-dark w-16 h-16 flex items-center justify-center rounded-xl border border-lab-cyan/20 shrink-0"
					aria-hidden="true"
				>
					{project.icon}
				</div>
			)}

			<div className="flex-1 min-w-0">
				<h2 className={`text-lg font-mono font-bold tracking-tight ${isDeadProject ? 'line-through text-lab-muted' : 'text-white group-hover:text-lab-cyan group-hover:neon-text transition-all duration-300'}`}>
					{project.title}
				</h2>
				<p className="text-lab-text text-sm">
					{project.description}
				</p>

				<p className="text-lab-muted text-xs italic mt-1 mb-2 font-mono">
					{project.id === 'ugh-okay'
						? '> Built to save my own sanity from endless scrolling.'
						: '> Another experiment from the lab.'}
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