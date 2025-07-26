import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true
};

export const metadata: Metadata = {
	title: "Max's Lab",
	description:
		"Digital experiments, half-finished ideas, and surprisingly working tools.",
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
		description: "Digital experiments, half-finished ideas, and surprisingly working tools.",
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
	twitter: {
		card: "summary_large_image",
		title: "Max's Lab",
		description: "Digital experiments, half-finished ideas, and surprisingly working tools.",
		images: ["/images/og-image.png"],
	},
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon.png' }
		],
		apple: { url: '/favicon.png' }
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
							<h2>Max&apos;s Portfolio</h2>
							<p>Pet projects, experiments, and apps I&apos;ve built.</p>
						</div>
					</div>
				</div>

				<div className="container mx-auto px-4">
					{children}
				</div>

				{/* Common Footer - Outside of container for full width */}
				<footer className="bg-lab-darker/80 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8 border-t border-lab-cyan/20 relative z-10 portfolio:bg-white portfolio:border-indigo-100 w-full">
					<div className="max-w-7xl mx-auto">
						<div className="flex flex-col items-center">
							<p className="text-center text-lab-muted font-mono portfolio:text-indigo-700/80 portfolio:font-sans">
								Built by Max Basev during caffeine overdoses and existential dread
							</p>
							<div className="flex gap-4 mt-3">
								<a
									href="https://github.com/MaxBasev"
									target="_blank"
									rel="noopener noreferrer"
									className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
									aria-label="GitHub"
								>
									<span role="img" aria-hidden="true" className="text-xl">🧪</span>
									<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
								</a>
								<a
									href="mailto:contact@maxbasev.com"
									className="text-lab-muted hover:text-lab-cyan transition-all duration-300 transform hover:scale-110 relative beaker portfolio:text-indigo-600 portfolio:hover:text-indigo-800"
									aria-label="Email"
								>
									<span role="img" aria-hidden="true" className="text-xl">⚗️</span>
									<span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-lab-cyan hover:w-full transition-all duration-300 portfolio:bg-indigo-600"></span>
								</a>
							</div>
							<div className="mt-3 text-xs text-lab-muted/50 font-mono portfolio:text-indigo-500/80 portfolio:font-sans">
								© {new Date().getFullYear()} Max Basev Labs
							</div>
						</div>
					</div>
				</footer>

				{/* Portfolio Mode Footer - Hidden when lab mode is active */}
				<footer className="hidden portfolio:block w-full">
					<p className="text-portfolio-accent/80 text-center">Built by Max Basev · No frameworks were harmed.</p>
				</footer>
			</body>
		</html>
	);
}
