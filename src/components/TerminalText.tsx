import React, { useState, useEffect } from 'react';

const experiments = [
	"> running test: UghOkay mobile app... success.",
	"> compiling code for Focus Buddy... complete.",
	"> analyzing Pocket Journal data structures... done.",
	"> deploying latest build to lab environment... success.",
	"> testing Tailwind responsiveness... passed."
];

const TerminalText: React.FC = () => {
	const [currentExperiment, setCurrentExperiment] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentExperiment((prev) => (prev + 1) % experiments.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="font-mono text-xs sm:text-sm text-lab-cyan opacity-70 mt-2 h-5 portfolio:text-[#1fbd89] portfolio:font-sans portfolio:font-semibold portfolio:opacity-100">
			<div className="terminal-text inline-block" style={{ width: 'fit-content' }}>
				{experiments[currentExperiment]}
			</div>
		</div>
	);
};

export default TerminalText; 