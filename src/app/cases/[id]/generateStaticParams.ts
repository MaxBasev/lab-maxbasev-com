import { projects } from '../../../data/projects';

export function generateStaticParams() {
	// Генерируем параметры для всех проектов
	return projects.map((project) => ({
		id: project.id,
	}));
} 