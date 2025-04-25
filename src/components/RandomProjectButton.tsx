"use client";

import { useState } from 'react';
import { Project } from '../types';

type RandomProjectButtonProps = {
	projects: Project[];
};

export const RandomProjectButton = ({ projects }: RandomProjectButtonProps) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const handleClick = () => {
		setIsAnimating(true);

		// Get a random project
		const randomProject = projects[Math.floor(Math.random() * projects.length)];

		// Navigate to project URL or a special page for it if available
		if (randomProject.links.website) {
			// Use setTimeout to allow animation to play
			setTimeout(() => {
				window.open(randomProject.links.website, '_blank');
				setIsAnimating(false);
			}, 500);
		} else if (randomProject.links.github) {
			setTimeout(() => {
				window.open(randomProject.links.github, '_blank');
				setIsAnimating(false);
			}, 500);
		} else {
			setIsAnimating(false);
		}
	};

	return (
		<div className="mt-16 text-center">
			<button
				onClick={handleClick}
				disabled={isAnimating}
				className={`
					px-6 py-3 bg-lab-cyan/10 border border-lab-cyan text-lab-cyan 
					font-mono font-medium rounded-md shadow-neon-cyan
					hover:bg-lab-cyan/20 hover:shadow-neon-cyan transition-all duration-300
					portfolio:bg-transparent portfolio:text-portfolio-accent portfolio:font-sans 
					portfolio:border-portfolio-accent portfolio:rounded-xl portfolio:text-[0.95rem] portfolio:shadow-none
					portfolio:hover:bg-portfolio-accent portfolio:hover:text-white
					${isAnimating ? 'animate-pulse' : ''}
				`}
			>
				{isAnimating ? 'Loading...' : 'Show Me Something Cool'}
			</button>
		</div>
	);
}; 