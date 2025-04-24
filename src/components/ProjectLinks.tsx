import React from 'react';
import { ProjectLinks as Links } from '../types';

type ProjectLinksProps = {
	links: Links;
};

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ links }) => {
	return (
		<div className="flex gap-3 mt-2 border-t dark:border-gray-700 pt-3">
			{links.website && (
				<a
					href={links.website}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
					aria-label="Visit website"
				>
					<span className="sr-only">Website</span>
					<span role="img" aria-hidden="true" className="text-lg">🌐</span>
				</a>
			)}

			{links.github && (
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
					aria-label="Visit GitHub repository"
				>
					<span className="sr-only">GitHub</span>
					<span role="img" aria-hidden="true" className="text-lg">💻</span>
				</a>
			)}

			{links.appStore && (
				<a
					href={links.appStore}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
					aria-label="Download from App Store"
				>
					<span className="sr-only">App Store</span>
					<span role="img" aria-hidden="true" className="text-lg">📱</span>
				</a>
			)}

			{links.googlePlay && (
				<a
					href={links.googlePlay}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
					aria-label="Download from Google Play"
				>
					<span className="sr-only">Google Play</span>
					<span role="img" aria-hidden="true" className="text-lg">🤖</span>
				</a>
			)}

			{links.blog && (
				<a
					href={links.blog}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
					aria-label="Read blog post"
				>
					<span className="sr-only">Blog</span>
					<span role="img" aria-hidden="true" className="text-lg">📝</span>
				</a>
			)}
		</div>
	);
}; 