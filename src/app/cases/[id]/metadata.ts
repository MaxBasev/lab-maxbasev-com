import { Metadata } from 'next';
import { projects } from '../../../data/projects';

type Props = {
	params: { id: string };
};

// Generate metadata for the project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// Find the project by ID
	const project = projects.find(p => p.id === params.id);

	// If the project is not found, return default metadata
	if (!project) {
		return {
			title: 'Project Not Found | Max\'s Lab',
			description: 'The requested project could not be found.'
		};
	}

	// Return metadata for the project
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