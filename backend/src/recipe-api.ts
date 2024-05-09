import 'dotenv/config';

const API_KEY = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!API_KEY) {
    throw new Error(API_KEY);
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey: API_KEY,
    query: searchTerm,
    number: '10',
    offset: ((page - 1) * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.error(error);
  }
};