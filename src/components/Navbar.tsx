import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
	return (
		<nav className="sticky top-0 z-10 backdrop-blur-md bg-opacity-40 bg-lab-dark border-b border-lab-cyan/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex items-center group">
							<span role="img" aria-label="Lab" className="text-2xl mr-2 group-hover:animate-pulse transition-all duration-300">🧪</span>
							<span className="font-mono font-bold text-xl text-white group-hover:text-lab-cyan transition-colors">Max&apos;s Lab</span>
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							href="/"
							className="px-3 py-2 rounded-md text-sm font-mono font-medium text-lab-text hover:text-lab-cyan hover:bg-lab-medium/50 transition-colors"
						>
							Home
						</Link>
						<Link
							href="https://maxbasev.com/blog"
							className="px-3 py-2 rounded-md text-sm font-mono font-medium text-lab-text hover:text-lab-purple hover:bg-lab-medium/50 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							Blog
						</Link>
						<Link
							href="/"
							className="px-3 py-2 rounded-md text-sm font-mono font-medium bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30"
						>
							Lab_
						</Link>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}; 