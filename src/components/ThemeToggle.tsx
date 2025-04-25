"use client";

import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
	const [isPortfolioMode, setIsPortfolioMode] = useState(false);

	// Initialize theme state from localStorage on component mount
	useEffect(() => {
		const savedPortfolioMode = localStorage.getItem('portfolioMode') === 'true';
		setIsPortfolioMode(savedPortfolioMode);

		// Apply the saved theme
		applyThemeClasses(savedPortfolioMode);
	}, []);

	// Apply theme classes to document
	const applyThemeClasses = (isPortfolio: boolean) => {
		const doc = document.documentElement;

		if (isPortfolio) {
			// Portfolio mode (светлая тема)
			doc.classList.add('portfolio-mode');
			doc.classList.add('portfolio');
			doc.classList.remove('dark');
		} else {
			// Lab mode (темная тема)
			doc.classList.add('dark');
			doc.classList.remove('portfolio-mode');
			doc.classList.remove('portfolio');
		}
	};

	// Toggle between Lab mode (dark) and Portfolio mode (light)
	const toggleMode = () => {
		const newMode = !isPortfolioMode;
		setIsPortfolioMode(newMode);
		localStorage.setItem('portfolioMode', newMode ? 'true' : 'false');
		applyThemeClasses(newMode);
	};

	return (
		<button
			onClick={toggleMode}
			className="p-2 rounded-full bg-lab-medium border border-lab-cyan/30 hover:bg-lab-cyan/10 transition-all duration-200 hover:scale-110 portfolio:bg-gray-50 portfolio:border-gray-200 portfolio:hover:bg-gray-100"
			aria-label="Toggle theme mode"
		>
			{isPortfolioMode ? (
				<FiMoon className="w-4 h-4 text-portfolio-accent" />
			) : (
				<FiSun className="w-4 h-4 text-lab-yellow" />
			)}
		</button>
	);
} 