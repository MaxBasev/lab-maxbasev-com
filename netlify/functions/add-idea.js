// Используем CommonJS синтаксис, который надежнее работает в Netlify Functions
const fs = require('fs');
const path = require('path');

// Функция для проверки и создания директории и файла
const ensureIdeasFile = (dataPath) => {
	try {
		const dir = path.dirname(dataPath);
		if (!fs.existsSync(dir)) {
			console.log('Creating directory:', dir);
			fs.mkdirSync(dir, { recursive: true });
		}

		if (!fs.existsSync(dataPath)) {
			console.log('Creating ideas file with empty data');
			fs.writeFileSync(dataPath, JSON.stringify({}, null, 2), 'utf8');
			return {};
		} else {
			const data = fs.readFileSync(dataPath, 'utf8');
			return JSON.parse(data);
		}
	} catch (error) {
		console.error('Error in ensureIdeasFile:', error);
		return {};
	}
};

// Функция для валидации полей идеи
const validateIdeaData = (ideaData) => {
	// Проверка наличия необходимых полей
	const requiredFields = ['title', 'description', 'tags', 'status', 'difficulty'];
	const missingFields = requiredFields.filter(field => !ideaData[field]);

	if (missingFields.length > 0) {
		return {
			valid: false,
			error: `Отсутствуют обязательные поля: ${missingFields.join(', ')}`
		};
	}

	// Проверка допустимых значений статуса
	const validStatuses = ['Draft', 'Early Research', 'Prototype', 'On Hold'];
	if (!validStatuses.includes(ideaData.status)) {
		return {
			valid: false,
			error: `Неверное значение статуса. Допустимые значения: ${validStatuses.join(', ')}`
		};
	}

	// Проверка допустимых значений сложности
	const validDifficulties = ['Easy', 'Medium', 'Hard', 'Nightmare fuel'];
	if (!validDifficulties.includes(ideaData.difficulty)) {
		return {
			valid: false,
			error: `Неверное значение сложности. Допустимые значения: ${validDifficulties.join(', ')}`
		};
	}

	// Проверка что теги являются массивом
	if (!Array.isArray(ideaData.tags) || ideaData.tags.length === 0) {
		return {
			valid: false,
			error: 'Теги должны быть непустым массивом'
		};
	}

	return { valid: true };
};

// Генерация идентификатора для новой идеи
const generateIdeaId = (title) => {
	return title
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.substring(0, 30);
};

exports.handler = async function (event) {
	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'POST') {
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Метод не разрешен' })
			};
		}

		// Получаем данные из запроса
		let ideaData;
		try {
			ideaData = JSON.parse(event.body);
		} catch (error) {
			return {
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Неверный формат JSON' })
			};
		}

		// Валидация данных
		const validationResult = validateIdeaData(ideaData);
		if (!validationResult.valid) {
			return {
				statusCode: 400,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: validationResult.error })
			};
		}

		// Путь к файлу JSON с данными
		const dataPath = path.join(__dirname, '..', 'data', 'ideas.json');
		console.log('Adding idea at path:', dataPath);

		// Получаем текущие идеи, файл будет создан если не существует
		const ideas = ensureIdeasFile(dataPath);

		// Генерируем ID для новой идеи
		const ideaId = generateIdeaId(ideaData.title);

		// Проверяем, не существует ли уже идеи с таким ID
		if (ideas[ideaId]) {
			return {
				statusCode: 409, // Conflict
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Идея с похожим названием уже существует' })
			};
		}

		// Добавляем новую идею
		ideas[ideaId] = {
			title: ideaData.title,
			description: ideaData.description,
			tags: ideaData.tags,
			status: ideaData.status,
			difficulty: ideaData.difficulty
		};

		// Запись обновленных данных
		fs.writeFileSync(dataPath, JSON.stringify(ideas, null, 2), 'utf8');

		// Также добавляем запись в файл голосов для новой идеи
		const votesPath = path.join(__dirname, '..', 'data', 'votes.json');
		if (fs.existsSync(votesPath)) {
			try {
				const votes = JSON.parse(fs.readFileSync(votesPath, 'utf8'));
				votes[ideaId] = { likes: 0, dislikes: 0 };
				fs.writeFileSync(votesPath, JSON.stringify(votes, null, 2), 'utf8');
			} catch (error) {
				console.error('Error updating votes file with new idea:', error);
				// Продолжаем выполнение даже в случае ошибки с файлом голосов
			}
		}

		return {
			statusCode: 201, // Created
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				success: true,
				ideaId: ideaId,
				message: 'Идея успешно добавлена'
			})
		};
	} catch (error) {
		console.error('Error in add-idea handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось добавить идею',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 