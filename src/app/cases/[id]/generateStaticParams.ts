import { projects } from '../../../data/projects';

export function generateStaticParams() {
	// Generate parameters for all projects
	return projects.map((project) => ({
		id: project.id,
	}));
} 