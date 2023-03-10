const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

// Create a new game
export const createGame = async (name) => {
  const response = await fetch(`${baseUrl}/games/`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const data = await response.json();
  return data;
};

// Create a new score
export const createScore = async (id, user, score) => {
  await fetch(`${baseUrl}/games/${id}/scores/`, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

// Get all scores
export const getScores = async (id) => {
  const response = await fetch(`${baseUrl}/games/${id}/scores/`);
  const data = response.json();
  return data;
};