import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Project } from '../types';
import { TagBadge } from './TagBadge';
import { ProjectLinks } from './ProjectLinks';
import ProjectModal from './ProjectModal';
import { getProjectContent } from './ProjectContent';

type ProjectCardProps = {
	project: Project;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const pathname = usePathname();
	const isDeadProject = project.tags.includes('Dead Project');
	const [modalOpen, setModalOpen] = useState(false);

	// Check if the URL is /cases/[id]
	useEffect(() => {
		const projectUrlPattern = new RegExp(`/cases/${project.id}$`);
		if (projectUrlPattern.test(pathname)) {
			setModalOpen(true);
		} else if (pathname === '/cases' || pathname === '/') {
			// Close the modal if you go to the /cases or / page
			setModalOpen(false);
		}
	}, [pathname, project.id]);

	const handleReadMore = () => {
		// Change the URL to /cases/[id] without reloading the page through the history API
		window.history.pushState({}, '', `/cases/${project.id}`);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		// Go back to the main page when the modal is closed through the history API
		window.history.pushState({}, '', '/');
	};

	// Получаем контент для проекта
	const projectContent = getProjectContent(project.id);

	return (
		<>
			<div className="angled-card bg-lab-medium/90 rounded-xl shadow-lg hover:shadow-neon-cyan transition-all duration-300 hover:scale-[1.01] border border-lab-cyan/20 overflow-hidden relative group flex flex-col h-full w-full max-w-full">
				{project.image && (
					<div className="w-full h-48 sm:h-60 relative border-b border-lab-cyan/20 overflow-hidden portfolio:border-gray-100">
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-contain sm:object-cover transition-transform duration-700 group-hover:scale-110"
							sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
							priority={project.id === 'ugh-okay'}
						/>
					</div>
				)}
				<div className="p-4 sm:p-6 relative portfolio:p-7 flex flex-col flex-grow">
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

					<p className={`text-lab-text text-sm mb-4 flex-grow portfolio:text-indigo-700 portfolio:font-sans portfolio:card-text`}>
						{project.description}
					</p>

					<div className="flex flex-wrap gap-2 mb-4">
						{project.tags.map((tag) => (
							<TagBadge key={tag} tag={tag} />
						))}
					</div>

					<div className="flex justify-between items-center mt-auto">
						<ProjectLinks links={project.links} />

						<button
							onClick={handleReadMore}
							className="px-3 py-1.5 bg-lab-purple/10 text-lab-purple border border-lab-purple/30 rounded-lg hover:bg-lab-purple/20 transition-colors text-sm font-mono portfolio:bg-indigo-100 portfolio:text-indigo-700 portfolio:border-indigo-200 portfolio:hover:bg-indigo-200 portfolio:font-sans ml-2"
						>
							<span className="portfolio:hidden">READ_MORE</span>
							<span className="hidden portfolio:inline">Read more</span>
						</button>
					</div>

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

			<ProjectModal
				isOpen={modalOpen}
				onClose={handleCloseModal}
				title={projectContent.title}
				content={projectContent.content}
				projectId={project.id}
			/>
		</>
	);
}; 