import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ['400', '500', '600', '700'],
	variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ['400', '500', '700'],
	variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
	title: "Max's Lab – Digital Experiments & Projects",
	description: "Digital experiments, half-finished ideas, and surprisingly working tools.",
	icons: {
		icon: '/favicon.ico',
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
					bg-lab-dark text-lab-text
				`}
			>
				<div className="absolute inset-0 bg-lab-grid opacity-10 pointer-events-none z-0"></div>
				<div className="absolute inset-0 bg-lab-noise opacity-30 pointer-events-none mix-blend-soft-light z-0"></div>
				{children}
			</body>
		</html>
	);
}
