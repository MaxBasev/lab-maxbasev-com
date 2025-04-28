// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// Функция для проверки и чтения файла с идеями
const readIdeasFile = (dataPath) => {
	try {
		if (!fs.existsSync(dataPath)) {
			console.log('Ideas file does not exist, cannot delete');
			return null;
		} else {
			const data = fs.readFileSync(dataPath, 'utf8');
			return JSON.parse(data);
		}
	} catch (error) {
		console.error('Error in readIdeasFile:', error);
		return null;
	}
};

exports.handler = async function (event) {
	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'DELETE') {
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Метод не разрешен. Используйте DELETE' })
			};
		}

		// Получаем идентификатор идеи из параметров запроса
		const params = event.queryStringParameters || {};
		const ideaId = params.id;

		if (!ideaId) {
			return {
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Отсутствует идентификатор идеи (id)' })
			};
		}

		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '..', 'data', 'ideas.json');
		console.log('Deleting idea at path:', dataPath);

		// Получаем текущие идеи
		const ideas = readIdeasFile(dataPath);

		if (!ideas) {
			return {
				statusCode: 404,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Файл с идеями не найден' })
			};
		}

		// Проверяем, существует ли идея с указанным ID
		if (!ideas[ideaId]) {
			return {
				statusCode: 404,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Идея с указанным ID не найдена' })
			};
		}

		// Сохраняем удаляемую идею для ответа
		const deletedIdea = { ...ideas[ideaId] };

		// Удаляем идею
		delete ideas[ideaId];

		// Запись обновленных данных
		fs.writeFileSync(dataPath, JSON.stringify(ideas, null, 2), 'utf8');

		// Также удаляем запись в файле голосов
		const votesPath = path.join(__dirname, '..', 'data', 'votes.json');
		if (fs.existsSync(votesPath)) {
			try {
				const votes = JSON.parse(fs.readFileSync(votesPath, 'utf8'));
				if (votes[ideaId]) {
					delete votes[ideaId];
					fs.writeFileSync(votesPath, JSON.stringify(votes, null, 2), 'utf8');
				}
			} catch (error) {
				console.error('Error updating votes file after idea deletion:', error);
				// Продолжаем выполнение даже в случае ошибки с файлом голосов
			}
		}

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				success: true,
				idea: deletedIdea,
				message: 'Идея успешно удалена'
			})
		};
	} catch (error) {
		console.error('Error in delete-idea handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось удалить идею',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 