import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
	return (
		<nav className="sticky top-0 z-10 backdrop-blur-md bg-opacity-80 bg-white dark:bg-opacity-80 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex items-center">
							<span role="img" aria-label="Lab" className="text-2xl mr-2">🧪</span>
							<span className="font-bold text-xl">Max&apos;s Lab</span>
						</Link>
					</div>

					<div className="flex items-center space-x-4">
						<Link
							href="/"
							className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							Home
						</Link>
						<Link
							href="https://maxbasev.com/blog"
							className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							Blog
						</Link>
						<Link
							href="/"
							className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
						>
							Lab
						</Link>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}; 