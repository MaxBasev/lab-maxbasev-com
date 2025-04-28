// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

exports.handler = async function () {
	try {
		// В Netlify функции, пути относительны к корню функции
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');

		// Проверяем, существует ли файл
		if (!fs.existsSync(dataPath)) {
			console.log('File not found:', dataPath);
			return {
				statusCode: 404,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({ error: 'Votes data file not found', path: dataPath })
			};
		}

		// Чтение файла
		const rawData = fs.readFileSync(dataPath, 'utf8');
		const votes = JSON.parse(rawData);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(votes)
		};
	} catch (error) {
		console.error('Error reading votes:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				error: 'Не удалось получить данные о голосах',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 