import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

type ProjectGridProps = {
	projects: Project[];
};

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr w-full">
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	);
}; 