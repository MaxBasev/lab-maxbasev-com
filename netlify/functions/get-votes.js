// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// ВАЖНОЕ ИЗМЕНЕНИЕ: Из-за проблем с API Netlify, временно используем глобальное in-memory хранилище
// для работы между вызовами. Это НЕ идеальное решение, но оно будет работать до внедрения
// более устойчивого решения (например, FaunaDB или другой внешней БД)

// Для стабильной работы в продакшн, нужно настроить одно из:
// 1. Внешняя база данных (FaunaDB, MongoDB, Supabase и т.д.)
// 2. Хранение в GitHub через API (требует отдельной настройки)
// 3. Хранение в сторонних сервисах (JSONBin.io, AirTable и т.д.)

// Глобальное хранилище данных 
global.votesStorage = global.votesStorage || null;

// Определяем дефолтные данные для голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Получение голосов из глобального хранилища
const getVotesFromGlobal = () => {
	// Если глобальное хранилище не инициализировано, используем дефолтные значения
	if (!global.votesStorage) {
		console.log('Инициализируем глобальное хранилище с дефолтными значениями');
		global.votesStorage = JSON.parse(JSON.stringify(defaultVotes));
	}
	console.log('Получены данные из глобального хранилища:', JSON.stringify(global.votesStorage));
	return JSON.parse(JSON.stringify(global.votesStorage));
};

// Функция для получения данных голосования
const getVotes = async () => {
	// Первый приоритет - глобальное хранилище
	console.log('Пытаемся получить данные из глобального хранилища...');
	const globalVotes = getVotesFromGlobal();
	if (globalVotes) {
		console.log('Используем данные из глобального хранилища');
		return globalVotes;
	}

	// Если по какой-то причине не удалось получить из глобального хранилища
	// Пытаемся прочитать из файла (для локальной разработки)
	try {
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Attempting to read votes from file (local development only):', dataPath);

		if (fs.existsSync(dataPath)) {
			const data = fs.readFileSync(dataPath, 'utf8');
			if (data && data.trim() !== '') {
				try {
					const fileVotes = JSON.parse(data);
					// Обновляем глобальное хранилище
					global.votesStorage = JSON.parse(JSON.stringify(fileVotes));
					console.log('Loaded votes from file');
					return fileVotes;
				} catch (e) {
					console.error('Error parsing votes JSON:', e);
				}
			}
		}
	} catch (error) {
		console.error('Error reading votes file:', error);
	}

	// Если не удалось загрузить, используем дефолтные данные
	console.log('Using default votes data');
	global.votesStorage = JSON.parse(JSON.stringify(defaultVotes));
	return JSON.parse(JSON.stringify(defaultVotes));
};

exports.handler = async function (event) {
	console.log('get-votes handler started');
	console.log('HTTP Method:', event.httpMethod);
	console.log('Headers:', JSON.stringify(event.headers));

	// Дамп всех доступных переменных окружения (без значений, только ключи)
	console.log('Available environment variables:', Object.keys(process.env).join(', '));

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
		console.log('Returning votes:', JSON.stringify(votes));

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
		console.error('Error in get-votes handler:', error.message);
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
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 