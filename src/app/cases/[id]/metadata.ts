import { Metadata } from 'next';
import { projects } from '../../../data/projects';

type Props = {
	params: { id: string };
};

// Генерация метаданных на основе статического пути
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// Находим проект по ID
	const project = projects.find(p => p.id === params.id);

	// Если проект не найден, возвращаем дефолтные метаданные
	if (!project) {
		return {
			title: 'Project Not Found | Max\'s Lab',
			description: 'The requested project could not be found.'
		};
	}

	// Возвращаем метаданные для проекта
	return {
		title: `${project.title} | Max's Lab`,
		description: project.description,
		openGraph: {
			title: `${project.title} | Max's Lab`,
			description: project.description,
			images: project.image ? [{ url: project.image }] : [],
			type: 'article'
		},
		twitter: {
			card: 'summary_large_image',
			title: `${project.title} | Max's Lab`,
			description: project.description,
			images: project.image ? [project.image] : ['/images/og-image.png']
		}
	};
} 