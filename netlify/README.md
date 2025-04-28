# Netlify Functions для системы голосования и идей

Эта директория содержит серверлесс-функции Netlify для хранения и обновления голосов и идей проектов на странице Ideas.

## Структура

- `functions/` - Netlify Functions для API
  - `get-votes.js` - Получение текущих голосов
  - `update-votes.js` - Обновление голосов
  - `get-ideas.js` - Получение списка идей
  - `add-idea.js` - Добавление новой идеи
  - `update-idea.js` - Обновление существующей идеи
  - `delete-idea.js` - Удаление идеи
- `data/` - Директория для хранения данных
  - `votes.json` - JSON с данными голосования
  - `ideas.json` - JSON с данными идей

## Установка и локальная разработка

1. Установите необходимые зависимости:

```bash
cd netlify/functions
npm install
```

2. Для локального тестирования установите Netlify CLI:

```bash
npm install -g netlify-cli
```

3. Запустите локальный сервер:

```bash
netlify dev
```

## API Endpoints для голосования

### GET /api/get-votes

Возвращает текущие голоса для всех идей.

**Пример ответа:**
```json
{
  "ai-writing": { "likes": 14, "dislikes": 3 },
  "task-manager": { "likes": 23, "dislikes": 5 },
  "snippet-manager": { "likes": 9, "dislikes": 2 }
}
```

### POST /api/update-votes

Обновляет голоса для идеи.

**Параметры запроса:**
```json
{
  "ideaId": "ai-writing",
  "action": "like" // "like" или "dislike"
}
```

**Пример ответа:**
```json
{
  "success": true,
  "votes": { "likes": 15, "dislikes": 3 }
}
```

## API Endpoints для идей

### GET /api/get-ideas

Возвращает список всех идей.

**Пример ответа:**
```json
{
  "ai-writing": {
    "title": "AI Writing Assistant",
    "description": "A browser extension that helps with writing clearer, more concise text.",
    "tags": ["Chrome Extension", "AI-powered", "Early Design"],
    "status": "Early Research",
    "difficulty": "Medium"
  },
  "task-manager": {
    "title": "Minimal Task Manager",
    "description": "Ultra-lightweight task manager with focus on simplicity.",
    "tags": ["Web App", "Tool", "In Development"],
    "status": "Prototype",
    "difficulty": "Easy"
  }
}
```

### POST /api/add-idea

Добавляет новую идею.

**Параметры запроса:**
```json
{
  "title": "New Project Idea",
  "description": "Description of the new idea",
  "tags": ["Web App", "Tool"],
  "status": "Draft",
  "difficulty": "Medium"
}
```

**Пример ответа:**
```json
{
  "success": true,
  "ideaId": "new-project-idea",
  "message": "Идея успешно добавлена"
}
```

### PUT или PATCH /api/update-idea?id=ai-writing

Обновляет существующую идею.

**Параметры запроса:**
```json
{
  "description": "Обновленное описание идеи",
  "status": "Prototype"
}
```

**Пример ответа:**
```json
{
  "success": true,
  "idea": {
    "title": "AI Writing Assistant",
    "description": "Обновленное описание идеи",
    "tags": ["Chrome Extension", "AI-powered", "Early Design"],
    "status": "Prototype",
    "difficulty": "Medium"
  },
  "message": "Идея успешно обновлена"
}
```

### DELETE /api/delete-idea?id=ai-writing

Удаляет идею.

**Пример ответа:**
```json
{
  "success": true,
  "idea": {
    "title": "AI Writing Assistant",
    "description": "A browser extension that helps with writing clearer, more concise text.",
    "tags": ["Chrome Extension", "AI-powered", "Early Design"],
    "status": "Early Research",
    "difficulty": "Medium"
  },
  "message": "Идея успешно удалена"
}
```

## Важные замечания

1. В проде API имеет ограничения на запись файлов. Для полноценного продакшена используйте GitHub API для синхронизации или мигрируйте на полноценное решение с БД.

2. Для предотвращения накрутки голосов и защиты идей в будущем расширьте API с проверкой IP или авторизацией.

3. Все данные сохраняются в файлах `votes.json` и `ideas.json`, которые должны иметь права на запись.

4. Для удобства использования API в клиентском коде, заголовки CORS установлены, чтобы разрешить кросс-доменные запросы с любого источника. 