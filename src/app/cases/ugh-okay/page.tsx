'use client';

import React from 'react';
import Link from 'next/link';

const UGH_OKAY_CONTENT = {
	title: "Ugh Okay",
	desc: "Ugh Okay is a dynamic music duo that blends elements of electronic, pop, and alternative genres to create a unique sound experience.",
	longDesc: [
		"Ugh Okay is a dynamic music duo that blends elements of electronic, pop, and alternative genres to create a unique sound experience.",
		"The duo, formed in 2018, consists of two talented musicians who bring their diverse musical backgrounds to the table, resulting in a fresh and innovative approach to music production.",
		"With several successful singles and an EP under their belt, Ugh Okay has been making waves in the indie music scene, garnering attention from critics and fans alike.",
		"Their distinctive sound, characterized by catchy melodies, introspective lyrics, and experimental production techniques, sets them apart in today's music landscape.",
		"The artists behind Ugh Okay are committed to pushing boundaries and exploring new sonic territories with each release, ensuring their work remains both cutting-edge and accessible to a wide audience."
	],
	tags: ["Music Duo", "Electronic", "Pop", "Alternative"],
	img: "/images/projects/ughokay.webp",
	link: "https://ughokay.com"
};

const formatContent = (content: string[]) => {
	return content.map((paragraph, index) => (
		<p
			key={index}
			className="mb-4 text-base text-neutral-300"
		>
			{paragraph}
		</p>
	));
};

export default function UghOkayPage() {
	// Если страница открыта напрямую, рендерим полный контент
	return (
		<div className="container mx-auto px-4 py-16">
			<div className="mb-8">
				<Link
					href="/"
					className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
				>
					← Back to projects
				</Link>
			</div>

			<div className="grid md:grid-cols-2 gap-8">
				<div>
					<img
						src={UGH_OKAY_CONTENT.img}
						alt={UGH_OKAY_CONTENT.title}
						className="w-full h-auto rounded-lg shadow-lg"
					/>
				</div>

				<div>
					<h1 className="text-4xl font-bold mb-4 text-white">{UGH_OKAY_CONTENT.title}</h1>

					<div className="mb-6">
						{UGH_OKAY_CONTENT.tags.map((tag, index) => (
							<span
								key={index}
								className="inline-block bg-neutral-800 text-neutral-300 rounded-full px-3 py-1 text-sm mr-2 mb-2"
							>
								{tag}
							</span>
						))}
					</div>

					<div className="mb-6">
						{formatContent(UGH_OKAY_CONTENT.longDesc)}
					</div>

					{UGH_OKAY_CONTENT.link && (
						<a
							href={UGH_OKAY_CONTENT.link}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
						>
							Visit Website
						</a>
					)}
				</div>
			</div>
		</div>
	);
} 