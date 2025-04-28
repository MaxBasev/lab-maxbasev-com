// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// ВАЖНО: В продакшн среде Netlify Functions не могут записывать файлы!
// Решение для прода:
// 1. Использовать Netlify API (рекомендуется)
// 2. Использовать внешние базы данных (Firebase, MongoDB и т.д.)
// 3. Использовать GitHub API для записи в репозиторий
//
// Текущая имплементация работает локально, но в проде голоса не будут сохраняться
// между вызовами функций!

// Определяем дефолтные данные для голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Временное in-memory хранилище для использования в пределах одной сессии
// Будет использоваться только если не удалось получить данные из Netlify API
let inMemoryVotes = null;

// Конфигурация API Netlify
const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';
const VARIABLE_KEY = 'VOTES_DATA'; // Имя переменной окружения для хранения голосов

// Функция для получения API-ключа из переменных окружения
const getNetlifyApiKey = () => {
	const apiKey = process.env.NETLIFY_API_KEY || '';
	console.log('NETLIFY_API_KEY present:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');
	return apiKey;
};

// Функция для получения ID сайта из переменных окружения
const getNetlifySiteId = () => {
	const siteId = process.env.NETLIFY_SITE_ID || '';
	console.log('NETLIFY_SITE_ID present:', siteId ? 'YES: ' + siteId : 'NO');
	return siteId;
};

// Функция для получения данных из Netlify API
const getVotesFromNetlifyApi = async () => {
	const apiKey = getNetlifyApiKey();
	const siteId = getNetlifySiteId();

	if (!apiKey || !siteId) {
		console.log('Netlify API key or site ID not found in environment variables');
		return null;
	}

	try {
		console.log(`Attempting to fetch data from ${NETLIFY_API_URL}/sites/${siteId}/env`);
		// Получаем переменные окружения для текущего сайта
		const response = await fetch(`${NETLIFY_API_URL}/sites/${siteId}/env?access_token=${apiKey}`);

		console.log('Netlify API response status:', response.status);
		console.log('Netlify API response statusText:', response.statusText);

		if (!response.ok) {
			console.error('Failed to fetch environment variables from Netlify API:', response.statusText);

			// Получаем текст ошибки для диагностики
			try {
				const errorText = await response.text();
				console.error('Error response body:', errorText);
			} catch (textError) {
				console.error('Could not read error response:', textError);
			}

			return null;
		}

		const envVars = await response.json();
		console.log('Environment variables fetched, count:', envVars.length);

		const votesVar = envVars.find(v => v.key === VARIABLE_KEY);
		console.log('VOTES_DATA variable found:', votesVar ? 'YES' : 'NO');

		if (!votesVar || !votesVar.values || !votesVar.values[0] || !votesVar.values[0].value) {
			console.log('Votes data not found in Netlify environment variables');
			return null;
		}

		try {
			const parsedVotes = JSON.parse(votesVar.values[0].value);
			console.log('Successfully parsed votes data from environment variable');
			return parsedVotes;
		} catch (e) {
			console.error('Error parsing votes data from environment variable:', e);
			return null;
		}
	} catch (error) {
		console.error('Error fetching data from Netlify API:', error);
		return null;
	}
};

// Функция для получения данных голосования
const getVotes = async () => {
	// Если у нас уже есть данные в памяти, используем их
	if (inMemoryVotes) {
		console.log('Using in-memory votes data');
		return inMemoryVotes;
	}

	// Пытаемся получить данные из Netlify API
	console.log('Attempting to get votes from Netlify API...');
	const netlifyVotes = await getVotesFromNetlifyApi();
	if (netlifyVotes) {
		console.log('Using votes data from Netlify API');
		inMemoryVotes = netlifyVotes;
		return netlifyVotes;
	}

	// Если не удалось получить из API, пытаемся прочитать из файла (для локальной разработки)
	try {
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Attempting to read votes from file (local development only):', dataPath);

		if (fs.existsSync(dataPath)) {
			const data = fs.readFileSync(dataPath, 'utf8');
			if (data && data.trim() !== '') {
				try {
					inMemoryVotes = JSON.parse(data);
					console.log('Loaded votes from file');
					return inMemoryVotes;
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
	inMemoryVotes = JSON.parse(JSON.stringify(defaultVotes));
	return inMemoryVotes;
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