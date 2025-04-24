import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

type RandomProjectButtonProps = {
	projects: Project[];
};

export const RandomProjectButton: React.FC<RandomProjectButtonProps> = ({ projects }) => {
	const [randomProject, setRandomProject] = useState<Project | null>(null);
	const [isGlitching, setIsGlitching] = useState(false);

	const getRandomProject = () => {
		setIsGlitching(true);
		
		// Add laboratory flash effect to the whole page
		document.body.classList.add('flash-effect');
		
		setTimeout(() => {
			const randomIndex = Math.floor(Math.random() * projects.length);
			setRandomProject(projects[randomIndex]);
			setIsGlitching(false);
			document.body.classList.remove('flash-effect');
		}, 500);
	};

	return (
		<div className="mt-16 mb-8">
			<button
				onClick={getRandomProject}
				className="flex items-center justify-center gap-2 mx-auto px-8 py-3 text-white bg-gradient-to-r from-lab-purple to-lab-cyan rounded-full hover:from-lab-cyan hover:to-lab-purple transition-all duration-500 hover:scale-105 shadow-neon-cyan font-mono"
			>
				<span role="img" aria-hidden="true" className="text-2xl animate-pulse">⚗️</span>
				run_random_test.exe
			</button>

			{randomProject && (
				<div className={`mt-12 max-w-xl mx-auto ${isGlitching ? 'animate-glitch' : 'animate-fade-in'}`}>
					<div className="bg-lab-darker/50 rounded-xl p-6 border border-lab-cyan/20">
						<h3 className="text-xl font-mono font-bold text-center mb-6 flex items-center justify-center gap-2">
							<span role="img" aria-hidden="true" className="text-lab-yellow text-2xl">✨</span> 
							<span className="text-lab-cyan neon-text glitch" data-text="Here's what escaped the test tube...">Here&apos;s what escaped the test tube...</span>
							<span role="img" aria-hidden="true" className="text-lab-yellow text-2xl">✨</span>
						</h3>
						<ProjectCard project={randomProject} />
					</div>
				</div>
			)}
		</div>
	);
}; 