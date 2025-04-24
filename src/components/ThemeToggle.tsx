import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
	const [darkMode, setDarkMode] = useState<boolean>(true);

	useEffect(() => {
		// Check if user has a preference stored
		const isDark = localStorage.getItem('darkMode') === 'true';
		setDarkMode(isDark);

		// Or check system preference
		if (localStorage.getItem('darkMode') === null) {
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setDarkMode(systemPrefersDark);
		}

		// Apply theme
		document.documentElement.classList.toggle('dark', darkMode);
	}, [darkMode]);

	const toggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.setItem('darkMode', newDarkMode.toString());
		document.documentElement.classList.toggle('dark', newDarkMode);
	};

	return (
		<button
			onClick={toggleDarkMode}
			className="p-2 rounded-full bg-lab-medium border border-lab-cyan/30 hover:bg-lab-cyan/10 transition-all duration-200 hover:scale-110"
			aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
		>
			{darkMode ? (
				<span role="img" aria-hidden="true" className="text-xl text-lab-yellow">🧪</span>
			) : (
				<span role="img" aria-hidden="true" className="text-xl text-lab-yellow">⚗️</span>
			)}
		</button>
	);
}; 