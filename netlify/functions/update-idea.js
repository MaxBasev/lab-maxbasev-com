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
			console.log('Ideas file does not exist, cannot update');
			return null;
		} else {
			const data = fs.readFileSync(dataPath, 'utf8');
			return JSON.parse(data);
		}
	} catch (error) {
		console.error('Error in ensureIdeasFile:', error);
		return null;
	}
};

// Функция для валидации полей идеи
const validateIdeaData = (ideaData) => {
	// Проверяем только переданные поля
	const validFields = ['title', 'description', 'tags', 'status', 'difficulty'];
	const invalidFields = Object.keys(ideaData).filter(key => !validFields.includes(key));

	if (invalidFields.length > 0) {
		return {
			valid: false,
			error: `Недопустимые поля: ${invalidFields.join(', ')}`
		};
	}

	// Проверка допустимых значений статуса
	if (ideaData.status) {
		const validStatuses = ['Draft', 'Early Research', 'Prototype', 'On Hold'];
		if (!validStatuses.includes(ideaData.status)) {
			return {
				valid: false,
				error: `Неверное значение статуса. Допустимые значения: ${validStatuses.join(', ')}`
			};
		}
	}

	// Проверка допустимых значений сложности
	if (ideaData.difficulty) {
		const validDifficulties = ['Easy', 'Medium', 'Hard', 'Nightmare fuel'];
		if (!validDifficulties.includes(ideaData.difficulty)) {
			return {
				valid: false,
				error: `Неверное значение сложности. Допустимые значения: ${validDifficulties.join(', ')}`
			};
		}
	}

	// Проверка что теги являются массивом
	if (ideaData.tags !== undefined) {
		if (!Array.isArray(ideaData.tags) || ideaData.tags.length === 0) {
			return {
				valid: false,
				error: 'Теги должны быть непустым массивом'
			};
		}
	}

	return { valid: true };
};

exports.handler = async function (event) {
	try {
		// Проверяем метод запроса
		if (event.httpMethod !== 'PUT' && event.httpMethod !== 'PATCH') {
			return {
				statusCode: 405,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, must-revalidate'
				},
				body: JSON.stringify({ error: 'Метод не разрешен. Используйте PUT или PATCH' })
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

		// Получаем данные из запроса
		let updateData;
		try {
			updateData = JSON.parse(event.body);
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
		const validationResult = validateIdeaData(updateData);
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
		console.log('Updating idea at path:', dataPath);

		// Получаем текущие идеи
		const ideas = ensureIdeasFile(dataPath);

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

		// Обновляем поля идеи
		const updatedIdea = { ...ideas[ideaId] };
		Object.keys(updateData).forEach(key => {
			updatedIdea[key] = updateData[key];
		});

		ideas[ideaId] = updatedIdea;

		// Запись обновленных данных
		fs.writeFileSync(dataPath, JSON.stringify(ideas, null, 2), 'utf8');

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				success: true,
				idea: updatedIdea,
				message: 'Идея успешно обновлена'
			})
		};
	} catch (error) {
		console.error('Error in update-idea handler:', error.message, error.stack);
		return {
			statusCode: 500,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-store, must-revalidate'
			},
			body: JSON.stringify({
				error: 'Не удалось обновить идею',
				details: error.message,
				stack: error.stack
			})
		};
	}
}; 