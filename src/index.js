import { createGame, createScore, getScores } from './modules/api.js';
import { get, set } from './modules/store.js';
import './style.css';

const id = get('gameId');
const scores = get('scores');

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
  const { name, score } = e.target;
  await createScore(id, name.value, score.value);
  e.target.reset();
});

// Load all scores
refreshBtn.addEventListener('click', async () => {
  const data = await getScores(id);
  displayScores(data.result);
  set('scores', data.result);
});
