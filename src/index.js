import { createGame, createScore, getScores } from './modules/api.js';
import { get, set } from './modules/store.js';
import './style.css';

const id = get('gameId');
const scores = get('scores') || [];

const form = document.getElementById('add-score-form');
const refreshBtn = document.getElementById('refresh-btn');
const scoresContainer = document.getElementById('scores-container');

(async () => {
  if (!id) {
    // Create a new game on page load
    const data = await createGame('My new game');
    const gameId = data.result.split(' ')[3];

    // Save the game id to the local storage
    set('gameId', gameId);
  }
})();

// Display all socres in the leaderboard
const displayScores = (scores) => {
  if (scores.length > 0) {
    scoresContainer.innerHTML = '';
    scoresContainer.classList.add('border');
    scores.forEach((score) => {
      const li = document.createElement('li');
      const html = `
      <span>${score.user}:</span>
      <span>${score.score}</span>
    `;

      li.innerHTML = html;
      scoresContainer.appendChild(li);
    });
  }
};

displayScores(scores);

// Create new score
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const gameId = get('gameId');
  const { name, score } = e.target;
  await createScore(gameId, name.value, score.value);
  e.target.reset();
});

// Load all scores
refreshBtn.addEventListener('click', async () => {
  const gameId = get('gameId');
  const data = await getScores(gameId);
  displayScores(data.result);
  set('scores', data.result);
});
