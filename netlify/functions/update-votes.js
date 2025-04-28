import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handler = async function (event) {
	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
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
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({ error: 'Некорректные параметры запроса' })
			};
		}

		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '../data/votes.json');

		// Чтение текущих данных
		const rawData = fs.readFileSync(dataPath);
		const votes = JSON.parse(rawData);

		// Обновление голосов
		if (!votes[ideaId]) {
			votes[ideaId] = { likes: 0, dislikes: 0 };
		}

		if (action === 'like') {
			votes[ideaId].likes += 1;
		} else if (action === 'dislike') {
			votes[ideaId].dislikes += 1;
		}

		// Запись обновленных данных
		fs.writeFileSync(dataPath, JSON.stringify(votes, null, 2));

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ success: true, votes: votes[ideaId] })
		};
	} catch (error) {
		console.error('Error updating votes:', error);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ error: 'Не удалось обновить голоса' })
		};
	}
}; 