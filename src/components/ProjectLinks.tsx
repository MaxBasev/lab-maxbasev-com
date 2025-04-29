import React from 'react';
import { ProjectLinks as ProjectLinksType } from '../types';

export const ProjectLinks: React.FC<{ links: ProjectLinksType }> = ({ links }) => {
	return (
		<div className="flex flex-wrap gap-2">
			{links.website && (
				<a
					href={links.website}
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 rounded-lg hover:bg-lab-cyan/20 transition-colors"
					aria-label="Website"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
						<path d="M2 12h20"></path>
						<path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"></path>
					</svg>
				</a>
			)}

			{links.blog && links.blog !== 'NDA' && (
				<a
					href={links.blog}
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-lab-purple/10 text-lab-purple border border-lab-purple/30 rounded-lg hover:bg-lab-purple/20 transition-colors"
					aria-label="Blog"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
						<path d="M6 9h12"></path>
						<path d="M6 14h12"></path>
						<path d="M6 19h12"></path>
					</svg>
				</a>
			)}

			{links.appStore && (
				<a
					href={links.appStore}
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-blue-900/10 text-blue-400 border border-blue-700/20 rounded-lg hover:bg-blue-900/20 transition-colors"
					aria-label="App Store"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
						<path d="M2 17l10 5 10-5"></path>
						<path d="M2 12l10 5 10-5"></path>
					</svg>
				</a>
			)}

			{links.github && (
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-gray-500/10 text-gray-400 border border-gray-700/20 rounded-lg hover:bg-gray-500/20 transition-colors"
					aria-label="GitHub"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
					</svg>
				</a>
			)}

			{links.googlePlay && (
				<a
					href={links.googlePlay}
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-green-900/10 text-green-400 border border-green-700/20 rounded-lg hover:bg-green-900/20 transition-colors"
					aria-label="Google Play"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-4 h-4"
					>
						<polygon points="5 3 19 12 5 21 5 3"></polygon>
					</svg>
				</a>
			)}
		</div>
	);
}; 