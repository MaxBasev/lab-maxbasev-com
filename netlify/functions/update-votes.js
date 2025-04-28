// Netlify Functions используют ESM синтаксис
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// ВАЖНОЕ ИЗМЕНЕНИЕ: Из-за проблем с API Netlify, временно используем глобальное in-memory хранилище
// для работы между вызовами. Это НЕ идеальное решение, но оно будет работать до внедрения
// более устойчивого решения (например, FaunaDB или другой внешней БД)

// Для стабильной работы в продакшн, нужно настроить одно из:
// 1. Внешняя база данных (FaunaDB, MongoDB, Supabase и т.д.)
// 2. Хранение в GitHub через API (требует отдельной настройки)
// 3. Хранение в сторонних сервисах (JSONBin.io, AirTable и т.д.)

// Дефолтные значения голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Глобальное хранилище данных
global.votesStorage = global.votesStorage || JSON.parse(JSON.stringify(defaultVotes));

// Функция для получения данных о голосах из глобального хранилища
const getVotes = async () => {
	try {
		console.log('Пытаемся получить данные из глобального хранилища...');

		// Если глобальное хранилище не инициализировано, используем дефолтные значения
		if (!global.votesStorage) {
			console.log('Глобальное хранилище не инициализировано, используем дефолтные значения');
			global.votesStorage = JSON.parse(JSON.stringify(defaultVotes));
		}

		console.log('Получены данные из глобального хранилища:', JSON.stringify(global.votesStorage));

		// Для локальной разработки, также пытаемся прочитать из файла
		// и обновить глобальное хранилище, если файл существует
		try {
			const dataDir = path.join(__dirname, '..', 'data');
			const votesFile = path.join(dataDir, 'votes.json');

			// Проверяем существование файла
			try {
				await fs.access(votesFile);
				console.log('Найден локальный файл с голосами, читаем его');
				try {
					const data = await fs.readFile(votesFile, 'utf8');
					const localVotes = JSON.parse(data);
					console.log('Обновляем глобальное хранилище из файла');
					global.votesStorage = localVotes;
				} catch (readError) {
					console.error('Ошибка чтения/парсинга файла:', readError);
				}
			} catch (accessError) {
				console.log('Локальный файл с голосами не найден');
			}
		} catch (fileError) {
			console.error('Ошибка при работе с файлом:', fileError);
		}

		// Возвращаем копию данных из глобального хранилища
		return JSON.parse(JSON.stringify(global.votesStorage));
	} catch (error) {
		console.error('Непредвиденная ошибка при получении голосов:', error);
		return JSON.parse(JSON.stringify(defaultVotes));
	}
};

// Функция для сохранения данных о голосах
const saveVotes = async (votes) => {
	try {
		// Обновляем глобальное хранилище
		console.log('Обновляем глобальное хранилище голосов');
		global.votesStorage = JSON.parse(JSON.stringify(votes));
		console.log('Глобальное хранилище обновлено:', JSON.stringify(global.votesStorage));

		// Для локальной разработки, также пытаемся сохранить в файл
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
					// Продолжаем выполнение, даже если не удалось создать директорию
				}
			}

			// Пытаемся записать в файл
			try {
				await fs.writeFile(votesFile, JSON.stringify(votes, null, 2));
				console.log('Голоса успешно сохранены в файл');
			} catch (writeError) {
				console.error('Ошибка записи в файл:', writeError);
			}
		} catch (error) {
			console.error('Ошибка при работе с файлом:', error);
		}

		return true;
	} catch (error) {
		console.error('Непредвиденная ошибка при сохранении голосов:', error);
		return false;
	}
};

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
		const saveSuccess = await saveVotes(votes);

		// Возврат результата
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				success: true,
				votes: votes[ideaId],
				message: 'Голос успешно учтен',
				debugInfo: {
					saveSuccess,
					globalStorageState: JSON.stringify(global.votesStorage),
					votesMatch: JSON.stringify(global.votesStorage) === JSON.stringify(votes)
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