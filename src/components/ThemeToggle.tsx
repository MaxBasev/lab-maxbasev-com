import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
	const [darkMode, setDarkMode] = useState<boolean>(false);

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
			className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
			aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
		>
			{darkMode ? (
				<span role="img" aria-hidden="true" className="text-xl text-yellow-500">☀️</span>
			) : (
				<span role="img" aria-hidden="true" className="text-xl text-indigo-500">🌙</span>
			)}
		</button>
	);
}; 