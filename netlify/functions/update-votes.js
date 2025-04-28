// Netlify Functions используют ESM синтаксис
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// ВАЖНО: В продакшн среде Netlify Functions не могут записывать файлы!
// Решение для прода:
// 1. Использовать Netlify API (рекомендуется)
// 2. Использовать внешние базы данных (Firebase, MongoDB и т.д.)
// 3. Использовать GitHub API для записи в репозиторий
//
// Текущая имплементация работает локально, но в проде голоса не будут сохраняться!

// Дефолтные значения голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// In-memory хранилище для голосов (будет использоваться, если не удалось получить данные из Netlify API)
let memoryVotes = { ...defaultVotes };

// Получение API ключа и ID сайта из переменных окружения
const getNetlifyCredentials = () => {
	const apiKey = process.env.NETLIFY_API_KEY;
	const siteId = process.env.NETLIFY_SITE_ID;

	console.log('NETLIFY_API_KEY present:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');
	console.log('NETLIFY_SITE_ID present:', siteId ? 'YES: ' + siteId : 'NO');
	console.log('Available environment variables:', Object.keys(process.env).join(', '));

	if (!apiKey || !siteId) {
		console.log('Netlify API ключ или ID сайта не найдены в переменных окружения');
		return null;
	}

	return { apiKey, siteId };
};

// Получение голосов из Netlify API (Environment Variables)
const fetchVotesFromNetlify = async () => {
	const credentials = getNetlifyCredentials();
	if (!credentials) return null;

	try {
		const { apiKey, siteId } = credentials;
		console.log(`Пытаемся получить данные из Netlify API: ${NETLIFY_API_URL}/sites/${siteId}/env`);

		const response = await fetch(
			`https://api.netlify.com/api/v1/sites/${siteId}/env`,
			{
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			}
		);

		console.log('Netlify API response status:', response.status);
		console.log('Netlify API response statusText:', response.statusText);

		if (!response.ok) {
			// Получаем текст ошибки для диагностики
			try {
				const errorText = await response.text();
				console.error('Error response body:', errorText);
			} catch (textError) {
				console.error('Could not read error response:', textError);
			}

			throw new Error(`Netlify API вернул статус: ${response.status}`);
		}

		const envVars = await response.json();
		console.log('Environment variables fetched, count:', envVars.length);

		const votesVar = envVars.find(v => v.key === 'VOTES_DATA');
		console.log('VOTES_DATA variable found:', votesVar ? 'YES' : 'NO');

		if (votesVar && votesVar.values && votesVar.values.length > 0) {
			try {
				const votes = JSON.parse(votesVar.values[0].value);
				console.log('Голоса успешно получены из Netlify API:', JSON.stringify(votes));
				return votes;
			} catch (error) {
				console.error('Ошибка парсинга данных голосов:', error);
			}
		} else {
			console.log('Данные о голосах не найдены в Netlify Environment Variables');
		}

		return null;
	} catch (error) {
		console.error('Ошибка получения голосов из Netlify API:', error);
		return null;
	}
};

// Сохранение голосов в Netlify API (Environment Variables)
const saveVotesToNetlify = async (votes) => {
	const credentials = getNetlifyCredentials();
	if (!credentials) return false;

	try {
		const { apiKey, siteId } = credentials;
		console.log('Пытаемся сохранить голоса в Netlify API...');

		// Проверяем существование переменной
		console.log(`Проверяем существование переменной VOTES_DATA: ${NETLIFY_API_URL}/sites/${siteId}/env`);
		const checkResponse = await fetch(
			`https://api.netlify.com/api/v1/sites/${siteId}/env`,
			{
				headers: {
					'Authorization': `Bearer ${apiKey}`,
					'Content-Type': 'application/json'
				}
			}
		);

		console.log('Check response status:', checkResponse.status);
		console.log('Check response statusText:', checkResponse.statusText);

		if (!checkResponse.ok) {
			// Получаем текст ошибки для диагностики
			try {
				const errorText = await checkResponse.text();
				console.error('Error response body:', errorText);
			} catch (textError) {
				console.error('Could not read error response:', textError);
			}

			throw new Error(`Netlify API вернул статус: ${checkResponse.status}`);
		}

		const envVars = await checkResponse.json();
		console.log('Environment variables fetched, count:', envVars.length);

		const votesVar = envVars.find(v => v.key === 'VOTES_DATA');
		console.log('VOTES_DATA variable found:', votesVar ? 'YES (id: ' + votesVar.id + ')' : 'NO');

		const votesJson = JSON.stringify(votes);
		console.log('Votes data to save:', votesJson);

		let response;

		if (votesVar) {
			// Обновляем существующую переменную
			console.log(`Обновляем существующую переменную: ${NETLIFY_API_URL}/sites/${siteId}/env/${votesVar.id}`);
			response = await fetch(
				`https://api.netlify.com/api/v1/sites/${siteId}/env/${votesVar.id}`,
				{
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${apiKey}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						key: 'VOTES_DATA',
						values: [{ value: votesJson }]
					})
				}
			);
		} else {
			// Создаем новую переменную
			console.log(`Создаем новую переменную: ${NETLIFY_API_URL}/sites/${siteId}/env`);
			response = await fetch(
				`https://api.netlify.com/api/v1/sites/${siteId}/env`,
				{
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${apiKey}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						key: 'VOTES_DATA',
						values: [{ value: votesJson }]
					})
				}
			);
		}

		console.log('Save response status:', response.status);
		console.log('Save response statusText:', response.statusText);

		if (!response.ok) {
			// Получаем текст ошибки для диагностики
			try {
				const errorText = await response.text();
				console.error('Error response body:', errorText);
			} catch (textError) {
				console.error('Could not read error response:', textError);
			}

			throw new Error(`Ошибка сохранения в Netlify API: ${response.status}`);
		}

		// Проверяем ответ от API
		try {
			const responseData = await response.json();
			console.log('Ответ от API после сохранения:', JSON.stringify(responseData));
		} catch (parseError) {
			console.log('Не удалось распарсить ответ после сохранения:', parseError);
			try {
				const responseText = await response.text();
				console.log('Текст ответа:', responseText);
			} catch (textError) {
				console.log('Не удалось получить текст ответа:', textError);
			}
		}

		console.log('Голоса успешно сохранены в Netlify API');
		return true;
	} catch (error) {
		console.error('Ошибка сохранения голосов в Netlify API:', error);
		return false;
	}
};

// Функция для получения данных о голосах
const getVotes = async () => {
	try {
		// Сначала пытаемся получить голоса из Netlify API
		console.log('Attempting to get votes from Netlify API...');
		const netlifyVotes = await fetchVotesFromNetlify();
		if (netlifyVotes) {
			memoryVotes = netlifyVotes; // Обновляем in-memory хранилище
			return netlifyVotes;
		}

		console.log('Используем локальное хранилище для голосов...');

		// Пробуем получить данные из файла (для локальной разработки)
		const dataDir = path.join(__dirname, '..', 'data');
		const votesFile = path.join(dataDir, 'votes.json');

		try {
			await fs.access(dataDir);
		} catch {
			console.log('Директория data не существует, создаем...');
			try {
				await fs.mkdir(dataDir, { recursive: true });
			} catch (mkdirErr) {
				console.error('Ошибка создания директории:', mkdirErr);
				return memoryVotes; // Возвращаем in-memory данные, если не можем создать директорию
			}
		}

		try {
			const data = await fs.readFile(votesFile, 'utf8');
			const votes = JSON.parse(data);
			memoryVotes = votes; // Обновляем in-memory хранилище
			return votes;
		} catch (err) {
			if (err.code === 'ENOENT') {
				console.log('Файл голосов не существует, создаем новый файл с дефолтными значениями...');
				try {
					await fs.writeFile(votesFile, JSON.stringify(defaultVotes, null, 2));
				} catch (writeErr) {
					console.error('Ошибка записи дефолтного файла голосов:', writeErr);
					// Несмотря на ошибку записи, продолжаем с in-memory данными
				}
			} else {
				console.error('Ошибка чтения файла голосов:', err);
			}

			return memoryVotes;
		}
	} catch (error) {
		console.error('Непредвиденная ошибка при получении голосов:', error);
		return memoryVotes;
	}
};

// Функция для сохранения данных о голосах
const saveVotes = async (votes) => {
	// Обновляем in-memory хранилище
	memoryVotes = { ...votes };

	// Сначала пытаемся сохранить в Netlify API
	const savedToNetlify = await saveVotesToNetlify(votes);

	// Если сохранение в API не удалось или мы в локальной разработке,
	// пытаемся сохранить в файл
	if (!savedToNetlify) {
		try {
			const dataDir = path.join(__dirname, '..', 'data');
			const votesFile = path.join(dataDir, 'votes.json');

			try {
				await fs.access(dataDir);
			} catch {
				console.log('Директория data не существует, создаем...');
				try {
					await fs.mkdir(dataDir, { recursive: true });
				} catch (mkdirErr) {
					console.error('Ошибка создания директории:', mkdirErr);
					return true; // Данные сохранены в памяти, возвращаем успех
				}
			}

			await fs.writeFile(votesFile, JSON.stringify(votes, null, 2));
			console.log('Голоса успешно сохранены в файл');
			return true;
		} catch (error) {
			console.error('Ошибка сохранения голосов в файл:', error);
			return true; // Данные сохранены в памяти, возвращаем успех несмотря на ошибку записи в файл
		}
	}

	return true;
};

// Добавляем константу для API URL
const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';

export const handler = async (event) => {
	// Настройка CORS
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Content-Type': 'application/json'
	};

	console.log('update-votes handler started');
	console.log('HTTP Method:', event.httpMethod);
	console.log('Headers:', JSON.stringify(event.headers));
	console.log('Available environment variables:', Object.keys(process.env).join(', '));

	// Обработка CORS preflight запросов
	if (event.httpMethod === 'OPTIONS') {
		console.log('Handling OPTIONS request (CORS preflight)');
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ message: 'CORS OK' })
		};
	}

	try {
		// Проверка метода
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				headers,
				body: JSON.stringify({ error: 'Метод не разрешен. Используйте POST.' })
			};
		}

		// Парсинг данных запроса
		console.log('Request body:', event.body);
		const data = JSON.parse(event.body);
		console.log('Parsed data:', JSON.stringify(data));
		const { ideaId, action } = data;

		if (!ideaId || !action || (action !== 'like' && action !== 'dislike')) {
			return {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: 'Неверные параметры запроса. Требуются ideaId и action (like/dislike).' })
			};
		}

		// Получение текущих голосов
		const votes = await getVotes();
		console.log('Current votes before update:', JSON.stringify(votes));

		// Проверка существования идеи
		if (!votes[ideaId]) {
			votes[ideaId] = { likes: 0, dislikes: 0 };
		}

		// Обновление голосов
		if (action === 'like') {
			votes[ideaId].likes += 1;
		} else {
			votes[ideaId].dislikes += 1;
		}

		console.log('Updated votes:', JSON.stringify(votes));

		// Сохранение обновленных голосов
		await saveVotes(votes);

		// Возврат результата
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				success: true,
				votes: votes[ideaId],
				message: 'Голос успешно учтен',
				debugInfo: {
					useNetlifyAPI: !!process.env.NETLIFY_API_KEY && !!process.env.NETLIFY_SITE_ID,
					inMemoryState: JSON.stringify(memoryVotes),
					votesMatch: JSON.stringify(memoryVotes) === JSON.stringify(votes)
				}
			})
		};
	} catch (error) {
		console.error('Ошибка обработки запроса:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: 'Внутренняя ошибка сервера', details: error.message })
		};
	}
}; 