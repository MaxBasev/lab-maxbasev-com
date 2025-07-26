import { MetadataRoute } from 'next';
import { projects } from '../data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'https://lab.maxbasev.com';
	
	// Static pages
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/ideas`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/cases`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
	];

	// Dynamic pages for each project
	const projectPages = projects.map((project) => ({
		url: `${baseUrl}/cases/${project.id}`,
		lastModified: new Date(),
		changeFrequency: 'monthly' as const,
		priority: 0.7,
	}));

	return [...staticPages, ...projectPages];
} 