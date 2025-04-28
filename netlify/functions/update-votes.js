// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
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
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');

		// Проверяем, существует ли файл
		if (!fs.existsSync(dataPath)) {
			console.log('File not found:', dataPath);
			// Если файла нет, создаем новый с начальными данными
			const initialData = {
				[ideaId]: { likes: 0, dislikes: 0 }
			};

			fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2), 'utf8');

			// Обновляем начальные данные
			if (action === 'like') {
				initialData[ideaId].likes += 1;
			} else if (action === 'dislike') {
				initialData[ideaId].dislikes += 1;
			}

			fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2), 'utf8');

			return {
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					success: true,
					votes: initialData[ideaId],
					note: 'Created new votes file'
				})
			};
		}

		// Чтение текущих данных
		const rawData = fs.readFileSync(dataPath, 'utf8');
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
		fs.writeFileSync(dataPath, JSON.stringify(votes, null, 2), 'utf8');

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ success: true, votes: votes[ideaId] })
		};
	} catch (error) {
		console.error('Error updating votes:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				error: 'Не удалось обновить голоса',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 