# Netlify Functions для системы голосования Ideas

Эта директория содержит серверлесс-функции Netlify для хранения и обновления голосов за идеи проектов на странице Ideas.

## Структура

- `functions/` - Netlify Functions для API
  - `get-votes.js` - Получение текущих голосов
  - `update-votes.js` - Обновление голосов
- `data/` - Директория для хранения данных
  - `votes.json` - JSON с данными голосования

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

## API Endpoints

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

## Важные замечания

1. В проде API имеет ограничения на запись файлов. Для полноценного продакшена используйте GitHub API для синхронизации или мигрируйте на полноценное решение с БД.

2. Для предотвращения накрутки голосов в будущем расширьте API с проверкой IP или авторизацией.

3. Все голоса сохраняются в файл `votes.json`, который должен иметь права на запись. 