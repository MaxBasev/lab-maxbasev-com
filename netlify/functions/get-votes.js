// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// ВАЖНОЕ ИЗМЕНЕНИЕ: Так как Netlify Functions - это serverless функции,
// ни одно из решений с in-memory хранилищем не будет работать в продакшене
// Эта функция возвращает фиксированные значения

// Определяем дефолтные данные для голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Функция для получения данных голосования
const getVotes = async () => {
	console.log('Получаем фиксированные значения для голосования...');

	// Клонируем дефолтные значения
	const votes = JSON.parse(JSON.stringify(defaultVotes));

	// Для локальной разработки, пытаемся прочитать из файла
	try {
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Пытаемся прочитать данные из файла (только для локальной разработки):', dataPath);

		if (fs.existsSync(dataPath)) {
			const data = fs.readFileSync(dataPath, 'utf8');
			if (data && data.trim() !== '') {
				try {
					const fileVotes = JSON.parse(data);
					console.log('Данные успешно загружены из файла');
					return fileVotes;
				} catch (e) {
					console.error('Ошибка парсинга JSON из файла:', e);
				}
			}
		}
	} catch (error) {
		console.error('Ошибка чтения файла:', error);
	}

	// Если не удалось загрузить из файла, используем дефолтные данные
	console.log('Использование дефолтных значений');
	return votes;
};

exports.handler = async function (event) {
	console.log('get-votes handler started');
	console.log('HTTP Method:', event.httpMethod);

	try {
		// Обработка OPTIONS запроса (CORS preflight)
		if (event.httpMethod === 'OPTIONS') {
			console.log('Handling OPTIONS request (CORS preflight)');
			return {
				statusCode: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type'
				},
				body: ''
			};
		}

		// Получаем данные голосования
		const votes = await getVotes();
		console.log('Возвращаемые данные о голосах:', JSON.stringify(votes));

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify(votes)
		};
	} catch (error) {
		console.error('Ошибка в обработчике get-votes:', error.message);
		console.error('Stack trace:', error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось получить данные о голосах',
				details: error.message
			})
		};
	}
}; 