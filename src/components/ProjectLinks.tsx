import React from 'react';
import { ProjectLinks as Links } from '../types';

type ProjectLinksProps = {
	links: Links;
};

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ links }) => {
	return (
		<div className="flex gap-3 mt-2 border-t border-lab-cyan/20 pt-3">
			{links.website && (
				<a
					href={links.website}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lab-text hover:text-lab-cyan transition-colors hover:neon-text"
					aria-label="Visit website"
				>
					<span className="sr-only">Website</span>
					<span role="img" aria-hidden="true" className="text-lg relative group">
						🌐
						<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan group-hover:w-full transition-all duration-300"></span>
					</span>
				</a>
			)}

			{links.github && (
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lab-text hover:text-lab-purple transition-colors hover:neon-purple"
					aria-label="Visit GitHub repository"
				>
					<span className="sr-only">GitHub</span>
					<span role="img" aria-hidden="true" className="text-lg relative group">
						💻
						<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-purple group-hover:w-full transition-all duration-300"></span>
					</span>
				</a>
			)}

			{links.appStore && (
				<a
					href={links.appStore}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lab-text hover:text-lab-cyan transition-colors hover:neon-text"
					aria-label="Download from App Store"
				>
					<span className="sr-only">App Store</span>
					<span role="img" aria-hidden="true" className="text-lg relative group">
						📱
						<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan group-hover:w-full transition-all duration-300"></span>
					</span>
				</a>
			)}

			{links.googlePlay && (
				<a
					href={links.googlePlay}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lab-text hover:text-lab-yellow transition-colors hover:neon-yellow"
					aria-label="Download from Google Play"
				>
					<span className="sr-only">Google Play</span>
					<span role="img" aria-hidden="true" className="text-lg relative group">
						🤖
						<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-yellow group-hover:w-full transition-all duration-300"></span>
					</span>
				</a>
			)}

			{links.blog && (
				<a
					href={links.blog}
					target="_blank"
					rel="noopener noreferrer"
					className="text-lab-text hover:text-lab-purple transition-colors hover:neon-purple"
					aria-label="Read blog post"
				>
					<span className="sr-only">Blog</span>
					<span role="img" aria-hidden="true" className="text-lg relative group">
						📝
						<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-purple group-hover:w-full transition-all duration-300"></span>
					</span>
				</a>
			)}
		</div>
	);
}; 