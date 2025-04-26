'use client';

import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ProjectCard';

export default function CasesPage() {
	// Возвращаем компоненты проектов для корректного SEO
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
} 