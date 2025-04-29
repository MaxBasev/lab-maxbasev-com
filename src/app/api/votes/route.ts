import { createClient } from 'redis';
import { NextResponse } from 'next/server';

type VoteData = {
	likes: number;
	dislikes: number;
};

type VotesCollection = {
	[key: string]: VoteData;
};

// Default votes data
const defaultVotes: VotesCollection = {
	'ai-writing': { likes: 14, dislikes: 3 },
	'task-manager': { likes: 23, dislikes: 5 },
	'snippet-manager': { likes: 9, dislikes: 2 },
	'deep-work-timer': { likes: 7, dislikes: 1 },
	'reading-list': { likes: 15, dislikes: 2 },
	'personal-ai': { likes: 19, dislikes: 4 }
};

// Redis client initialization
const getRedisClient = async () => {
	// Создаем и подключаем клиент при каждом запросе
	const client = createClient({
		url: process.env.REDIS_URL
	});

	await client.connect();
	return client;
};

// GET /api/votes - retrieve all votes
export async function GET() {
	try {
		console.log('GET /api/votes request received');

		// Connect to Redis
		const redis = await getRedisClient();

		try {
			// Try to get votes from Redis
			const storedVotes = await redis.get('lab:votes');

			// If no votes found, initialize with default votes
			if (!storedVotes) {
				await redis.set('lab:votes', JSON.stringify(defaultVotes));
				await redis.disconnect();
				return NextResponse.json(defaultVotes);
			}

			// Parse and return stored votes
			const votes = JSON.parse(storedVotes);
			await redis.disconnect();
			return NextResponse.json(votes);

		} catch (error) {
			console.error('Redis operation error:', error);
			await redis.disconnect();
			return NextResponse.json(defaultVotes);
		}

	} catch (error) {
		console.error('Could not connect to Redis:', error);
		// Fallback to default votes if Redis connection fails
		return NextResponse.json(defaultVotes);
	}
}

// POST /api/votes - update votes for a specific idea
export async function POST(request: Request) {
	try {
		console.log('POST /api/votes request received');

		// Parse request body
		const body = await request.json();
		const { ideaId, action } = body as { ideaId: string; action: 'like' | 'dislike' };

		// Validate input
		if (!ideaId || !action || (action !== 'like' && action !== 'dislike')) {
			return NextResponse.json(
				{ error: 'Invalid parameters. Required: ideaId and action (like/dislike)' },
				{ status: 400 }
			);
		}

		try {
			// Connect to Redis
			const redis = await getRedisClient();

			// Get current votes
			const storedVotes = await redis.get('lab:votes');
			const votes: VotesCollection = storedVotes
				? JSON.parse(storedVotes)
				: { ...defaultVotes };

			// Initialize idea if it doesn't exist
			if (!votes[ideaId]) {
				votes[ideaId] = { likes: 0, dislikes: 0 };
			}

			// Update votes
			if (action === 'like') {
				votes[ideaId].likes += 1;
			} else {
				votes[ideaId].dislikes += 1;
			}

			// Save updated votes
			await redis.set('lab:votes', JSON.stringify(votes));

			// Close Redis connection
			await redis.disconnect();

			// Return result
			return NextResponse.json({
				success: true,
				votes: votes[ideaId]
			});

		} catch (error) {
			console.error('Redis operation error:', error);

			// Fallback to local update if Redis fails
			const votes = { ...defaultVotes };

			if (!votes[ideaId]) {
				votes[ideaId] = { likes: 0, dislikes: 0 };
			}

			if (action === 'like') {
				votes[ideaId].likes += 1;
			} else {
				votes[ideaId].dislikes += 1;
			}

			return NextResponse.json({
				success: true,
				votes: votes[ideaId],
				message: 'Used fallback storage due to Redis error'
			});
		}

	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Failed to update votes' },
			{ status: 500 }
		);
	}
} 