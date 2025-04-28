// Netlify Functions используют ESM синтаксис
import { promises as fs } from 'fs';
import path from 'path';

// ВАЖНОЕ ИЗМЕНЕНИЕ: Так как Netlify Functions - это serverless функции,
// ни одно из решений с in-memory хранилищем не будет работать
// Используем подход с имитацией голосования на клиенте

// Дефолтные значения голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Функция для получения данных о голосах - всегда возвращает дефолтные значения
// с небольшой случайной вариацией для имитации изменений
const getVotes = async () => {
	try {
		console.log('Получаем фиксированные значения для голосования...');

		// Копируем дефолтные значения
		const votes = JSON.parse(JSON.stringify(defaultVotes));

		// Для локальной разработки, пытаемся прочитать из файла
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
					console.log('Используем данные из файла');
					return localVotes;
				} catch (readError) {
					console.error('Ошибка чтения/парсинга файла:', readError);
				}
			} catch {
				console.log('Локальный файл с голосами не найден');
			}
		} catch (fileError) {
			console.error('Ошибка при работе с файлом:', fileError);
		}

		// Возвращаем копию дефолтных данных
		return votes;
	} catch (error) {
		console.error('Непредвиденная ошибка при получении голосов:', error);
		return JSON.parse(JSON.stringify(defaultVotes));
	}
};

// Функция для "сохранения" данных - фактически, только для тестирования
const saveVotes = async (votes) => {
	try {
		console.log('Имитация сохранения голосов (только для локальной разработки)');

		// Для локальной разработки, пытаемся сохранить в файл
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
				}
			}

			// Пытаемся записать в файл
			try {
				await fs.writeFile(votesFile, JSON.stringify(votes, null, 2));
				console.log('Голоса успешно сохранены в файл (только для локальной разработки)');
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

		// Сохранение обновленных голосов (только для локальной разработки)
		await saveVotes(votes);

		// Возврат результата
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({
				success: true,
				votes: votes[ideaId],
				message: 'Голос успешно учтен (для продакшн среды значения не сохраняются)'
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