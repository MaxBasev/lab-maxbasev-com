import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

type RandomProjectButtonProps = {
	projects: Project[];
};

export const RandomProjectButton: React.FC<RandomProjectButtonProps> = ({ projects }) => {
	const [randomProject, setRandomProject] = useState<Project | null>(null);

	const getRandomProject = () => {
		const randomIndex = Math.floor(Math.random() * projects.length);
		setRandomProject(projects[randomIndex]);
	};

	return (
		<div className="mt-16 mb-8">
			<button
				onClick={getRandomProject}
				className="flex items-center justify-center gap-2 mx-auto px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg font-medium"
			>
				<span role="img" aria-hidden="true" className="text-xl">🎲</span>
				Surprise Me
			</button>

			{randomProject && (
				<div className="mt-8 max-w-xl mx-auto">
					<div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6 mb-4">
						<h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
							<span role="img" aria-hidden="true">✨</span>
							Random Pick
							<span role="img" aria-hidden="true">✨</span>
						</h3>
						<ProjectCard project={randomProject} />
					</div>
				</div>
			)}
		</div>
	);
}; 