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
	'ai-writing': { likes: 0, dislikes: 0 },
	'task-manager': { likes: 0, dislikes: 0 },
	'snippet-manager': { likes: 0, dislikes: 0 },
	'deep-work-timer': { likes: 0, dislikes: 0 },
	'reading-list': { likes: 0, dislikes: 0 },
	'personal-ai': { likes: 0, dislikes: 0 }
};

// Constant for Redis votes key
const REDIS_VOTES_KEY = 'lab_votes_v2';

// Flag to force reset votes on startup
let FORCE_RESET = true;

// Function to create no-cache headers
const getNoCacheHeaders = () => {
	return {
		'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
		'Pragma': 'no-cache',
		'Expires': '0',
		'Surrogate-Control': 'no-store'
	};
};

// Redis client initialization
const getRedisClient = async () => {
	// Create and connect client on each request
	const client = createClient({
		url: process.env.REDIS_URL
	});

	await client.connect();
	return client;
};

// Helper function to reset votes data
const resetVotesData = async () => {
	try {
		const redis = await getRedisClient();
		await redis.set(REDIS_VOTES_KEY, JSON.stringify(defaultVotes));
		await redis.disconnect();
		console.log('Votes data has been reset to defaults');
		return true;
	} catch (error) {
		console.error('Failed to reset votes data:', error);
		return false;
	}
};

// GET /api/votes - retrieve all votes
export async function GET() {
	try {
		console.log('GET /api/votes request received');

		// Reset votes if forced
		if (FORCE_RESET) {
			await resetVotesData();
			// Set to false after reset to prevent repeated resets
			FORCE_RESET = false;
		}

		// Connect to Redis
		const redis = await getRedisClient();

		try {
			// Try to get votes from Redis
			const storedVotes = await redis.get(REDIS_VOTES_KEY);

			// If no votes found, initialize with default votes
			if (!storedVotes) {
				await redis.set(REDIS_VOTES_KEY, JSON.stringify(defaultVotes));
				await redis.disconnect();
				return NextResponse.json(defaultVotes, {
					headers: getNoCacheHeaders()
				});
			}

			// Parse and return stored votes
			const votes = JSON.parse(storedVotes);
			await redis.disconnect();
			return NextResponse.json(votes, {
				headers: getNoCacheHeaders()
			});

		} catch (error) {
			console.error('Redis operation error:', error);
			await redis.disconnect();
			return NextResponse.json(defaultVotes, {
				headers: getNoCacheHeaders()
			});
		}

	} catch (error) {
		console.error('Could not connect to Redis:', error);
		// Fallback to default votes if Redis connection fails
		return NextResponse.json(defaultVotes, {
			headers: getNoCacheHeaders()
		});
	}
}

// Delete route to reset votes (can be called via API)
export async function DELETE() {
	try {
		const result = await resetVotesData();

		if (result) {
			return NextResponse.json(
				{ success: true, message: 'Votes have been reset' },
				{ headers: getNoCacheHeaders() }
			);
		} else {
			return NextResponse.json(
				{ success: false, message: 'Failed to reset votes' },
				{ status: 500, headers: getNoCacheHeaders() }
			);
		}
	} catch (error) {
		console.error('Error resetting votes:', error);
		return NextResponse.json(
			{ success: false, message: 'Error resetting votes' },
			{ status: 500, headers: getNoCacheHeaders() }
		);
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
				{
					status: 400,
					headers: getNoCacheHeaders()
				}
			);
		}

		try {
			// Connect to Redis
			const redis = await getRedisClient();

			// Get current votes
			const storedVotes = await redis.get(REDIS_VOTES_KEY);
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
			await redis.set(REDIS_VOTES_KEY, JSON.stringify(votes));

			// Close Redis connection
			await redis.disconnect();

			// Return result
			return NextResponse.json(
				{
					success: true,
					votes: votes[ideaId]
				},
				{
					headers: getNoCacheHeaders()
				}
			);

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

			return NextResponse.json(
				{
					success: true,
					votes: votes[ideaId],
					message: 'Used fallback storage due to Redis error'
				},
				{
					headers: getNoCacheHeaders()
				}
			);
		}

	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Failed to update votes' },
			{
				status: 500,
				headers: getNoCacheHeaders()
			}
		);
	}
} 