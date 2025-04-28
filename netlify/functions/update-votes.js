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

// Функция для безопасной записи данных в файл с резервным копированием
const safeWriteFile = (filePath, data) => {
	const backupPath = `${filePath}.backup`;

	try {
		// Если файл существует, создаем резервную копию
		if (fs.existsSync(filePath)) {
			console.log('Creating backup of existing file');
			fs.copyFileSync(filePath, backupPath);
			console.log('Backup created at:', backupPath);
		}

		// Записываем новые данные
		console.log('Writing data to file');
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
		console.log('Data written successfully');

		// Удаляем резервную копию, если запись прошла успешно
		if (fs.existsSync(backupPath)) {
			fs.unlinkSync(backupPath);
			console.log('Backup file removed');
		}

		return true;
	} catch (error) {
		console.error('Error writing file:', error);

		// Восстанавливаем из резервной копии, если она есть
		if (fs.existsSync(backupPath)) {
			console.log('Restoring from backup');
			try {
				fs.copyFileSync(backupPath, filePath);
				console.log('Restored from backup successfully');
			} catch (restoreError) {
				console.error('Failed to restore from backup:', restoreError);
			}
		}

		throw error;
	}
};

exports.handler = async function (event) {
	console.log('update-votes handler started');
	console.log('HTTP Method:', event.httpMethod);
	console.log('Headers:', JSON.stringify(event.headers));

	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'POST') {
			console.log('Method not allowed:', event.httpMethod);
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Метод не разрешен' })
			};
		}

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

		// Получаем данные из запроса
		console.log('Parsing request body:', event.body);
		const { ideaId, action } = JSON.parse(event.body);
		console.log('Request data:', { ideaId, action });

		if (!ideaId || !action || (action !== 'like' && action !== 'dislike')) {
			console.log('Invalid request parameters');
			return {
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Некорректные параметры запроса' })
			};
		}

		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '..', 'data', 'votes.json');
		console.log('Updating votes at path:', dataPath);
		console.log('Absolute path:', path.resolve(dataPath));

		// Получаем текущие голоса, файл будет создан если не существует
		const votes = ensureVotesFile(dataPath);
		console.log('Current votes before update:', JSON.stringify(votes));

		// Убедимся, что для данной идеи есть запись
		if (!votes[ideaId]) {
			console.log('Creating new entry for idea:', ideaId);
			votes[ideaId] = { likes: 0, dislikes: 0 };
		}

		// Обновление голосов
		if (action === 'like') {
			console.log(`Incrementing likes for ${ideaId}`);
			votes[ideaId].likes += 1;
		} else if (action === 'dislike') {
			console.log(`Incrementing dislikes for ${ideaId}`);
			votes[ideaId].dislikes += 1;
		}

		console.log('Updated votes:', JSON.stringify(votes));
		console.log('Writing updated votes to file');

		// Безопасная запись обновленных данных
		safeWriteFile(dataPath, votes);
		console.log('Vote update completed successfully');

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				success: true,
				votes: votes[ideaId],
				message: 'Голос успешно учтен'
			})
		};
	} catch (error) {
		console.error('Error in update-votes handler:', error.message);
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
				error: 'Не удалось обновить голоса',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 