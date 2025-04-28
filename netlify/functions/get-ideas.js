// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// Определяем дефолтные данные для идей
const defaultIdeas = {
	'ai-writing': {
		title: 'AI Writing Assistant',
		description: 'A browser extension that helps with writing clearer, more concise text. Uses AI to suggest improvements without changing your voice.',
		tags: ['Chrome Extension', 'AI-powered', 'Early Design'],
		status: 'Early Research',
		difficulty: 'Medium'
	},
	'task-manager': {
		title: 'Minimal Task Manager',
		description: 'Ultra-lightweight task manager with focus on simplicity and keyboard shortcuts. No accounts, no cloud sync, just local tasks.',
		tags: ['Web App', 'Tool', 'In Development'],
		status: 'Prototype',
		difficulty: 'Easy'
	},
	'snippet-manager': {
		title: 'Code Snippet Manager',
		description: 'VS Code extension for saving, organizing and reusing code snippets with smart context detection.',
		tags: ['VS Code Extension', 'Tool', 'Concept'],
		status: 'Draft',
		difficulty: 'Nightmare fuel'
	},
	'deep-work-timer': {
		title: 'Deep Work Timer',
		description: 'A timer application that enforces focus sessions using psychological techniques and gentle accountability.',
		tags: ['Web App', 'Tool', 'Productivity'],
		status: 'Draft',
		difficulty: 'Medium'
	},
	'reading-list': {
		title: 'Reading List Tracker',
		description: 'Browser extension that helps organize articles, blogs and papers to read later, with built-in comprehension scoring.',
		tags: ['Chrome Extension', 'Tool', 'Reading'],
		status: 'On Hold',
		difficulty: 'Hard'
	},
	'personal-ai': {
		title: 'Personal AI Assistant',
		description: 'Privacy-focused assistant for personal knowledge management and retrieval.',
		tags: ['AI', 'Knowledge Management', 'Privacy'],
		status: 'Early Research',
		difficulty: 'Nightmare fuel'
	}
};

// Функция для проверки и создания директории и файла
const ensureIdeasFile = (dataPath) => {
	try {
		const dir = path.dirname(dataPath);
		if (!fs.existsSync(dir)) {
			console.log('Creating directory:', dir);
			fs.mkdirSync(dir, { recursive: true });
		}

		if (!fs.existsSync(dataPath)) {
			console.log('Creating ideas file with default data');
			fs.writeFileSync(dataPath, JSON.stringify(defaultIdeas, null, 2), 'utf8');
			return defaultIdeas;
		} else {
			const data = fs.readFileSync(dataPath, 'utf8');
			return JSON.parse(data);
		}
	} catch (error) {
		console.error('Error in ensureIdeasFile:', error);
		// В случае любой ошибки, просто возвращаем дефолтные данные
		return defaultIdeas;
	}
};

exports.handler = async function () {
	try {
		// В Netlify функции, пути относительны к корню функции
		const dataPath = path.join(__dirname, '..', 'data', 'ideas.json');
		console.log('Attempting to access ideas file at:', dataPath);

		// Обеспечиваем существование файла и получаем данные
		const ideas = ensureIdeasFile(dataPath);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify(ideas)
		};
	} catch (error) {
		console.error('Error in get-ideas handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось получить данные об идеях',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 