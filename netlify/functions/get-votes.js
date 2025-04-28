import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handler = async function () {
	try {
		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '../data/votes.json');

		// Чтение файла
		const rawData = fs.readFileSync(dataPath);
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
		console.error('Error reading votes:', error);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ error: 'Не удалось получить данные о голосах' })
		};
	}
}; 