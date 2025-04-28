// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// Определяем дефолтные данные для голосования
const defaultVotes = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 }
};

// Функция для проверки и создания директории и файла
const ensureVotesFile = (dataPath) => {
	try {
		const dir = path.dirname(dataPath);
		console.log('Checking directory existence:', dir);
		if (!fs.existsSync(dir)) {
			console.log('Creating directory:', dir);
			try {
				fs.mkdirSync(dir, { recursive: true });
				console.log('Directory created successfully');
			} catch (dirError) {
				console.error('Error creating directory:', dirError);
				throw dirError;
			}
		} else {
			console.log('Directory already exists');
			// Проверяем права на запись в директорию
			try {
				fs.accessSync(dir, fs.constants.W_OK);
				console.log('Directory is writable');
			} catch (accessError) {
				console.error('Directory is not writable:', accessError);
				throw accessError;
			}
		}

		console.log('Checking file existence:', dataPath);
		if (!fs.existsSync(dataPath)) {
			console.log('Creating votes file with default data');
			try {
				fs.writeFileSync(dataPath, JSON.stringify(defaultVotes, null, 2), 'utf8');
				console.log('Votes file created successfully');
				return defaultVotes;
			} catch (fileError) {
				console.error('Error creating votes file:', fileError);
				throw fileError;
			}
		} else {
			console.log('Votes file already exists, reading content');
			try {
				const data = fs.readFileSync(dataPath, 'utf8');
				console.log('File content raw:', data);

				// Проверка на пустой файл
				if (!data || data.trim() === '') {
					console.log('Votes file is empty, using default data');
					// Если файл пустой, записываем дефолтные данные
					fs.writeFileSync(dataPath, JSON.stringify(defaultVotes, null, 2), 'utf8');
					return defaultVotes;
				}

				try {
					const parsedData = JSON.parse(data);
					console.log('Votes file read successfully:', JSON.stringify(parsedData));
					return parsedData;
				} catch (jsonError) {
					console.error('Error parsing JSON, using default data:', jsonError);
					// Если JSON невалидный, записываем дефолтные данные
					fs.writeFileSync(dataPath, JSON.stringify(defaultVotes, null, 2), 'utf8');
					return defaultVotes;
				}
			} catch (readError) {
				console.error('Error reading votes file:', readError);
				throw readError;
			}
		}
	} catch (error) {
		console.error('Error in ensureVotesFile:', error);
		// В случае любой ошибки, просто возвращаем дефолтные данные
		return defaultVotes;
	}
};

exports.handler = async function (event) {
	console.log('get-votes handler started');
	console.log('HTTP Method:', event.httpMethod);
	console.log('Headers:', JSON.stringify(event.headers));

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

		// В Netlify функции, пути относительны к корню функции
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Attempting to access votes file at:', dataPath);
		console.log('Absolute path:', path.resolve(dataPath));

		// Обеспечиваем существование файла и получаем данные
		const votes = ensureVotesFile(dataPath);
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