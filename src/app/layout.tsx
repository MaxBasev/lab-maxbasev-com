import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
	title: "Max's Lab",
	description:
		"A digital playground of experimental projects by Max Basev. Discover web tools, applications, and experiments from the lab.",
	keywords: [
		"Max Basev",
		"digital lab",
		"experiments",
		"web development",
		"projects",
		"creative coding",
		"portfolio",
		"developer",
	],
	openGraph: {
		title: "Max's Lab",
		description: "A digital playground of experimental projects by Max Basev",
		url: "https://lab.maxbasev.com",
		siteName: "Max's Lab",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "Max's Lab",
			},
		],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon.png' }
		],
		apple: { url: '/favicon.png' }
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 5,
		userScalable: true
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.variable} ${jetBrainsMono.variable} font-sans antialiased min-h-screen
				`}
			>
				{/* Lab Mode Background Elements */}
				<div className="absolute inset-0 bg-lab-grid opacity-10 pointer-events-none z-0 portfolio:hidden"></div>
				<div className="absolute inset-0 bg-lab-noise opacity-30 pointer-events-none mix-blend-soft-light z-0 portfolio:hidden"></div>

				{/* Portfolio Mode Background Elements */}
				<div className="absolute inset-0 bg-portfolio-dots opacity-10 pointer-events-none z-0 hidden portfolio:block"></div>

				<Navbar />

				{/* Portfolio Mode Hero Section */}
				<div className="hidden portfolio:block">
					<div className="hero">
						<div className="container mx-auto">
							<h1>Max&apos;s Portfolio</h1>
							<p>Pet projects, experiments, and apps I&apos;ve built.</p>
						</div>
					</div>
				</div>

				<div className="container mx-auto px-4">
					{children}
				</div>

				{/* Portfolio Mode Footer */}
				<footer className="hidden portfolio:block w-full">
					<p className="text-portfolio-accent/80 text-center">Built by Max Basev · No frameworks were harmed.</p>
				</footer>
			</body>
		</html>
	);
}
