'use client';

import React, { useEffect, useRef } from 'react';

interface ProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	content: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, title, content }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	// Блокируем скролл страницы когда модальное окно открыто
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	// Закрытие по клику вне модального окна
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	// Закрытие по клавише Escape
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscKey);
		}
		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const formatContent = (text: string) => {
		// Разбиваем текст на строки
		const lines = text.split('\n');

		// Форматируем каждую строку
		return lines.map((line, index) => {
			// Обрабатываем заголовки с эмодзи
			if (line.match(/^🚀|^🔥|^🛠️|^📈|^🧠|^✨|^🔮|^📸|^🧪|^🚀/)) {
				return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-lab-cyan portfolio:text-indigo-700">{line}</h3>;
			}

			// Обрабатываем основной заголовок
			if (line.match(/^📱/)) {
				return <h2 key={index} className="text-2xl font-bold mb-4 text-lab-purple portfolio:text-indigo-800">{line}</h2>;
			}

			// Пустые строки преобразуем в отступы
			if (line.trim() === '') {
				return <div key={index} className="h-2"></div>;
			}

			// Обычный текст
			return <p key={index} className="mb-2">{line}</p>;
		});
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-lab-dark/80 backdrop-blur-sm transition-opacity duration-300 portfolio:bg-black/60">
			<div
				ref={modalRef}
				className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-lab-medium/90 rounded-xl border border-lab-cyan/30 shadow-xl p-6 m-4 animate-fadeIn portfolio:bg-white portfolio:border-indigo-100"
			>
				<div className="flex justify-between items-start mb-4">
					<h2 className="text-2xl font-mono font-bold text-lab-cyan portfolio:text-indigo-900 portfolio:font-sans">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="text-lab-muted hover:text-lab-cyan transition-colors p-2 -mr-2 portfolio:text-indigo-400 portfolio:hover:text-indigo-700"
						aria-label="Close modal"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>

				<div className="text-lab-text font-mono leading-relaxed portfolio:text-indigo-700 portfolio:font-sans">
					{formatContent(content)}
				</div>

				<div className="mt-8 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-lab-cyan/10 text-lab-cyan border border-lab-cyan/30 rounded-lg hover:bg-lab-cyan/20 transition-colors font-mono portfolio:bg-indigo-100 portfolio:text-indigo-700 portfolio:border-indigo-200 portfolio:hover:bg-indigo-200 portfolio:font-sans"
					>
						<span className="portfolio:hidden">CLOSE_MODAL</span>
						<span className="hidden portfolio:inline">Close</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectModal; 