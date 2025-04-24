'use client';

import { useState, useEffect } from 'react';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectList } from '../components/ProjectList';
import { TagFilter } from '../components/TagFilter';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { RandomProjectButton } from '../components/RandomProjectButton';
import { ProjectTag } from '../types';
import { projects } from '../data/projects';
import { Navbar } from '../components/Navbar';

export default function Home() {
	const [viewMode, setViewMode] = useState<ViewMode>('grid');
	const [selectedTags, setSelectedTags] = useState<ProjectTag[]>([]);
	const [filteredProjects, setFilteredProjects] = useState(projects);

	// Get all unique tags
	const allTags = Array.from(
		new Set(projects.flatMap((project) => project.tags))
	) as ProjectTag[];

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredProjects(projects);
		} else {
			const filtered = projects.filter((project) =>
				selectedTags.some((tag) => project.tags.includes(tag))
			);
			setFilteredProjects(filtered);
		}
	}, [selectedTags]);

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<main className="flex-grow pt-8 pb-16 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12">
						<h1 className="text-4xl font-bold mb-4 text-center">
							<span role="img" aria-label="Lab" className="mr-3">🧪</span>
							Max&apos;s Lab
						</h1>
						<p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							A digital laboratory showcasing my projects, experiments, and client work — from silly side projects to full-scale apps.
						</p>
					</div>

					<div className="mb-10 flex flex-col md:flex-row justify-between gap-6">
						<div className="order-2 md:order-1">
							<TagFilter
								tags={allTags}
								selectedTags={selectedTags}
								onChange={setSelectedTags}
							/>
						</div>
						<div className="order-1 md:order-2">
							<ViewToggle viewMode={viewMode} onChange={setViewMode} />
						</div>
					</div>

					{filteredProjects.length === 0 ? (
						<div className="text-center py-12 bg-white dark:bg-gray-800/30 rounded-xl shadow-sm">
							<p className="text-xl">No projects found with the selected tags.</p>
							<button
								onClick={() => setSelectedTags([])}
								className="mt-4 px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
							>
								Clear filters
							</button>
						</div>
					) : (
						<>
							{viewMode === 'grid' ? (
								<ProjectGrid projects={filteredProjects} />
							) : (
								<ProjectList projects={filteredProjects} />
							)}
						</>
					)}

					<RandomProjectButton projects={projects} />
				</div>
			</main>

			<footer className="bg-white dark:bg-gray-900/50 backdrop-blur-sm py-8 border-t border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center">
						<p className="text-center text-gray-500 dark:text-gray-400">
							© {new Date().getFullYear()} Max Basev
						</p>
						<div className="flex gap-4 mt-3">
							<a
								href="https://github.com/MaxBasev"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
								aria-label="GitHub"
							>
								<span role="img" aria-hidden="true" className="text-xl">💻</span>
							</a>
							<a
								href="mailto:contact@maxbasev.com"
								className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
								aria-label="Email"
							>
								<span role="img" aria-hidden="true" className="text-xl">📧</span>
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
