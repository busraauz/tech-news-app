const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const getArticles = async (category: string) => {
	try {
		const response = await fetch(`${BASE_URL}/news/${category}`);
		if (!response.ok) {
			throw new Error(`API error: ${response.status}`);
		}
		const articles = await response.json();
		return articles;
	} catch (error) {
		console.error('Failed to fetch articles:', error);
		throw error;
	}
};
