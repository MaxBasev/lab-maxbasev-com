// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// Определяем дефолтные данные для голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Функция для проверки и создания директории и файла
const ensureVotesFile = (dataPath) => {
	try {
		const dir = path.dirname(dataPath);
		if (!fs.existsSync(dir)) {
			console.log('Creating directory:', dir);
			fs.mkdirSync(dir, { recursive: true });
		}

		if (!fs.existsSync(dataPath)) {
			console.log('Creating votes file with default data');
			fs.writeFileSync(dataPath, JSON.stringify(defaultVotes, null, 2), 'utf8');
			return defaultVotes;
		} else {
			const data = fs.readFileSync(dataPath, 'utf8');
			return JSON.parse(data);
		}
	} catch (error) {
		console.error('Error in ensureVotesFile:', error);
		// В случае любой ошибки, просто возвращаем дефолтные данные
		return defaultVotes;
	}
};

exports.handler = async function () {
	try {
		// В Netlify функции, пути относительны к корню функции
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Attempting to access votes file at:', dataPath);

		// Обеспечиваем существование файла и получаем данные
		const votes = ensureVotesFile(dataPath);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify(votes)
		};
	} catch (error) {
		console.error('Error in get-votes handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось получить данные о голосах',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 