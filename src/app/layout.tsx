import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ['400', '500', '600', '700'],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Max's Lab – Side Projects, Apps, and Client Work",
	description: "A digital lab of projects by Max Basev. From silly side experiments to full-scale apps — this is where ideas get shipped.",
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
				className={`${inter.variable} font-sans antialiased min-h-screen
					bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900
					text-gray-900 dark:text-gray-100
				`}
			>
				{children}
			</body>
		</html>
	);
}
