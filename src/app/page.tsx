'use client';

import { useState, useEffect } from 'react';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectList } from '../components/ProjectList';
import { TagFilter } from '../components/TagFilter';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { RandomProjectButton } from '../components/RandomProjectButton';
import { ProjectTag } from '../types';
import { projects } from '../data/projects';
import TerminalText from '../components/TerminalText';

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
		<div className="flex flex-col min-h-screen relative overflow-hidden portfolio:bg-white">
			<main className="flex-grow pt-5 sm:pt-10 pb-10 sm:pb-20 px-4 relative z-10 portfolio:bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8 sm:mb-12 relative">
						{/* Lab decoration elements */}
						<div className="absolute -top-5 left-1/4 w-1 h-20 bg-lab-cyan/20 rounded-full portfolio:hidden"></div>
						<div className="absolute -top-2 right-1/4 w-1 h-10 bg-lab-purple/20 rounded-full portfolio:hidden"></div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-3 sm:mb-4 text-center text-white portfolio:text-indigo-900">
							<span role="img" aria-label="Lab" className="mr-3 animate-pulse">🧪</span>
							Max&apos;s <span className="text-lab-cyan portfolio:text-[#1fbd89] neon-text portfolio:no-underline">Lab</span>
						</h1>
						<p className="text-base sm:text-lg text-center text-lab-text max-w-2xl mx-auto font-mono portfolio:text-indigo-700 portfolio:font-sans">
							Digital experiments, half-finished ideas, and surprisingly working tools.
						</p>

						<div className="text-center">
							<TerminalText />
						</div>
					</div>

					<div className="mb-6 sm:mb-10 flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
						<div className="order-2 md:order-1 p-3 sm:p-4 rounded-xl border border-lab-cyan/20 portfolio:border-portfolio-accent/20 portfolio:shadow-none portfolio:p-5">
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
						<div className="text-center py-12 bg-lab-medium/50 rounded-xl border border-lab-cyan/20 portfolio:bg-white portfolio:border-indigo-100">
							<p className="text-xl font-mono text-lab-cyan portfolio:text-portfolio-accent portfolio:font-sans">No experiments found with the selected reagents.</p>
							<button
								onClick={() => setSelectedTags([])}
								className="mt-4 px-4 py-2 bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 rounded-lg hover:bg-lab-cyan/20 transition-colors font-mono portfolio:bg-transparent portfolio:text-portfolio-accent portfolio:border-portfolio-accent portfolio:hover:bg-portfolio-accent portfolio:hover:text-white portfolio:font-sans"
							>
								<span className="portfolio:hidden">RESET_FILTERS</span>
								<span className="hidden portfolio:inline">Reset Filters</span>
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

			<footer className="bg-lab-darker/80 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8 border-t border-lab-cyan/20 relative z-10 portfolio:bg-white portfolio:border-indigo-100">
				<div className="flex flex-col items-center">
					<p className="text-center text-lab-muted font-mono portfolio:text-indigo-700/80 portfolio:font-sans">
						Built by Max Basev during caffeine overdoses and existential dread
					</p>
					<div className="flex gap-4 mt-3">
						<a
							href="https://github.com/MaxBasev"
							target="_blank"
							rel="noopener noreferrer"
							className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
							aria-label="GitHub"
						>
							<span role="img" aria-hidden="true" className="text-xl">🧪</span>
							<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
						</a>
						<a
							href="mailto:contact@maxbasev.com"
							className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
							aria-label="Email"
						>
							<span role="img" aria-hidden="true" className="text-xl">⚗️</span>
							<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
						</a>
					</div>
					<div className="mt-3 text-xs text-lab-muted/50 font-mono portfolio:text-indigo-500/80 portfolio:font-sans">
						© {new Date().getFullYear()} Max Basev Labs
					</div>
				</div>
			</footer>
		</div>
	);
}
