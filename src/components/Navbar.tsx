"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-40 bg-lab-dark border-b border-lab-cyan/20 portfolio:bg-white portfolio:border-b portfolio:border-indigo-100 portfolio:shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex items-center group">
							<span role="img" aria-label="Lab" className="text-2xl mr-2 group-hover:animate-pulse transition-all duration-300 portfolio:text-xl">🧪</span>
							<span className="font-mono font-bold text-xl text-white group-hover:text-lab-cyan transition-colors portfolio:font-sans portfolio:text-indigo-900 portfolio:font-bold portfolio:tracking-tight">
								<span className="portfolio:hidden">Max&apos;s Lab</span>
								<span className="hidden portfolio:inline">Max&apos;s Lab</span>
							</span>
						</Link>
					</div>

					<div className="flex items-center space-x-5">
						<Link
							href="/"
							className={`px-3 py-2 rounded-md text-sm font-mono font-medium transition-colors portfolio:font-sans portfolio:hover:text-portfolio-accent portfolio:hover:bg-indigo-50 portfolio:rounded-md
								${pathname === '/'
									? 'text-lab-cyan bg-lab-medium/50 portfolio:text-portfolio-accent portfolio:bg-indigo-50'
									: 'text-lab-text hover:text-lab-cyan hover:bg-lab-medium/50 portfolio:text-indigo-700'
								}`}
							aria-label="Home"
						>
							Home
						</Link>
						<Link
							href="https://maxbasev.com"
							className="px-3 py-2 rounded-md text-sm font-mono font-medium text-lab-text hover:text-lab-purple hover:bg-lab-medium/50 transition-colors portfolio:font-sans portfolio:text-indigo-700 portfolio:hover:text-portfolio-accent portfolio:hover:bg-indigo-50 portfolio:rounded-md"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Resume (откроется в новой вкладке)"
						>
							Resume
						</Link>
						<Link
							href="https://skazoff.com"
							className="px-3 py-2 rounded-md text-sm font-mono font-medium text-lab-text hover:text-lab-purple hover:bg-lab-medium/50 transition-colors portfolio:font-sans portfolio:text-indigo-700 portfolio:hover:text-portfolio-accent portfolio:hover:bg-indigo-50 portfolio:rounded-md"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Blog (откроется в новой вкладке)"
						>
							Blog
						</Link>

						<div className="flex -space-x-[1px]">
							<Link
								href="/"
								className={`px-4 py-2 rounded-l-md text-sm font-mono font-medium transition-all duration-200
									${pathname === '/' || pathname === '/lab'
										? 'bg-lab-cyan/20 text-lab-cyan border border-lab-cyan/40 portfolio:bg-portfolio-accent portfolio:text-white portfolio:border portfolio:border-portfolio-accent portfolio:shadow-md z-10'
										: 'bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 portfolio:bg-portfolio-accent/90 portfolio:text-white portfolio:border portfolio:border-portfolio-accent portfolio:shadow-sm hover:z-10'
									}`}
							>
								<span className="portfolio:hidden">Lab_</span>
								<span className="hidden portfolio:inline">Lab</span>
							</Link>
							<Link
								href="/ideas"
								className={`px-4 py-2 rounded-r-md text-sm font-mono font-medium transition-all duration-200
									${pathname === '/ideas'
										? 'bg-lab-purple/20 text-lab-purple border border-lab-purple/40 portfolio:bg-portfolio-accent portfolio:text-white portfolio:border portfolio:border-portfolio-accent portfolio:shadow-md z-10'
										: 'bg-lab-purple/10 text-lab-purple border border-lab-purple/30 portfolio:bg-portfolio-accent/90 portfolio:text-white portfolio:border portfolio:border-portfolio-accent portfolio:shadow-sm hover:z-10'
									}`}
							>
								<span className="portfolio:hidden">Ideas_</span>
								<span className="hidden portfolio:inline">Ideas</span>
							</Link>
						</div>

						<div className="hidden">
							<ThemeToggle />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}; 