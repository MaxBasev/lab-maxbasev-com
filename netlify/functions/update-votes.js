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

exports.handler = async function (event) {
	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Метод не разрешен' })
			};
		}

		// Получаем данные из запроса
		const { ideaId, action } = JSON.parse(event.body);

		if (!ideaId || !action || (action !== 'like' && action !== 'dislike')) {
			return {
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Некорректные параметры запроса' })
			};
		}

		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Updating votes at path:', dataPath);

		// Получаем текущие голоса, файл будет создан если не существует
		const votes = ensureVotesFile(dataPath);

		// Убедимся, что для данной идеи есть запись
		if (!votes[ideaId]) {
			votes[ideaId] = { likes: 0, dislikes: 0 };
		}

		// Обновление голосов
		if (action === 'like') {
			votes[ideaId].likes += 1;
		} else if (action === 'dislike') {
			votes[ideaId].dislikes += 1;
		}

		// Запись обновленных данных
		fs.writeFileSync(dataPath, JSON.stringify(votes, null, 2), 'utf8');

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({ success: true, votes: votes[ideaId] })
		};
	} catch (error) {
		console.error('Error in update-votes handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось обновить голоса',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 