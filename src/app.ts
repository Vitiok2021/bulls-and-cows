import { createElement } from './dom.js';
import { generateSecret } from './generateSecret.js';
import { evaluateGuess } from './evaluateGuess.js';
import { isValidGuess } from './isValidGuess.js';

const title = createElement('h1', 'Bulls and cows', 'game-title');
const startButton = createElement('button', 'Start', 'btn-primary');

const lengthSelect = createElement('select', '', 'length-select');
lengthSelect.setAttribute('id', 'length-select');
lengthSelect.setAttribute('name', 'length-sel');
for (let i = 2; i <= 6; i++) {
  const option = createElement('option', String(i), 'game-option');
  option.setAttribute('value', String(i));
  lengthSelect.append(option);
}
const systemSelect = createElement('select', '', 'game-systems');
systemSelect.setAttribute('id', 'system-select');
systemSelect.setAttribute('name', 'system');
const systems = ['bin', 'oct', 'dec', 'hex'];
for (const sys of systems) {
  const option = createElement('option', sys, 'systems-option');
  option.setAttribute('value', sys);
  systemSelect.append(option);
}

systemSelect.addEventListener('change', () => {
  const sysDropdown = systemSelect as HTMLSelectElement;
  const lenDropdown = lengthSelect as HTMLSelectElement;

  if (sysDropdown.value === 'bin') {
    lenDropdown.value = '2';
    lenDropdown.disabled = true;
  } else {
    lenDropdown.disabled = false;
  }
});
systemSelect.dispatchEvent(new Event('change'));
let currentSecret = '';
let activeLength = 0;
let activeBase = 0;
let startTime = 0;
let history: { guess: string; bulls: number; cows: number }[] = [];
startButton.addEventListener('click', () => {
  (userInput as HTMLInputElement).disabled = false;
  (userButton as HTMLButtonElement).disabled = false;
  const system = systemSelect as HTMLSelectElement;
  const length = lengthSelect as HTMLSelectElement;

  activeLength = Number(length.value);

  const bases = {
    bin: 2,
    oct: 8,
    dec: 10,
    hex: 16,
  };

  activeBase = bases[system.value as keyof typeof bases];

  currentSecret = generateSecret(activeLength, activeBase);
  startTime = Date.now();

  length.disabled = true;
  system.disabled = true;
  const startBtnEl = startButton as HTMLButtonElement;
  startBtnEl.disabled = true;
});

const userInput = createElement('input', '', 'user-guess');
userInput.setAttribute('id', 'user-guess');
userInput.setAttribute('name', 'guess');
userInput.setAttribute('placeholder', 'Your number...');
(userInput as HTMLInputElement).disabled = true;
const userButton = createElement('button', 'Guess', 'user-button');
(userButton as HTMLButtonElement).disabled = true;
const errorDiv = createElement('div', '', 'error-message');
userButton.addEventListener('click', () => {
  const inputEl = userInput as HTMLInputElement;
  const guess = inputEl.value;

  if (!isValidGuess(guess, activeLength, activeBase)) {
    errorDiv.textContent = 'Incorrect length or invalid characters';
    return;
  }
  errorDiv.textContent = '';

  const result = evaluateGuess(currentSecret, guess);
  history = [...history, { guess: guess, bulls: result.bulls, cows: result.cows }];

  renderHistory(history);
  inputEl.value = '';

  if (result.bulls === activeLength) {
    handleWin(inputEl);
  }
});

function renderHistory(historyData: { guess: string; bulls: number; cows: number }[]) {
  historyContainer.textContent = '';

  for (const [index, item] of historyData.entries()) {
    const recordText = `Attempt ${index + 1} [${item.guess}] | Bulls: ${item.bulls}, Cows: ${item.cows}`;
    const recordEl = createElement('p', recordText, 'history-record');
    historyContainer.append(recordEl);
  }
}
function handleWin(inputEl: HTMLInputElement) {
  const winMessage = createElement('h2', 'You win!!!', 'win-message');
  historyContainer.append(winMessage);

  const timeTaken = Number(((Date.now() - startTime) / 1000).toFixed(1));
  const attemptsCount = history.length;

  winMessage.textContent = `You win!!! Attempts: ${attemptsCount}, Time: ${timeTaken}s`;

  saveRecord(attemptsCount, timeTaken, activeLength, activeBase);

  (userButton as HTMLButtonElement).disabled = true;
  inputEl.disabled = true;
}
const historyContainer = createElement('div', '', 'history-container');

const resetButton = createElement('button', 'New Game', 'btn-secondary');
resetButton.addEventListener('click', () => {
  const inputEl = userInput as HTMLInputElement;
  (userInput as HTMLInputElement).disabled = true;
  (userButton as HTMLButtonElement).disabled = true;
  history = [];
  historyContainer.textContent = '';
  errorDiv.textContent = '';
  inputEl.value = '';

  (lengthSelect as HTMLSelectElement).disabled = false;
  (systemSelect as HTMLSelectElement).disabled = false;
  (startButton as HTMLButtonElement).disabled = false;

  systemSelect.dispatchEvent(new Event('change'));
});

function saveRecord(attempts: number, time: number, length: number, base: number) {
  const recordsString = localStorage.getItem('bulls-cows-records');
  let records: { attempts: number; time: number; length: number; base: number }[] = [];

  if (recordsString) {
    records = JSON.parse(recordsString);
  }

  records.push({ attempts, time, length, base });

  records.sort((a, b) => {
    if (a.attempts === b.attempts) {
      return a.time - b.time;
    }
    return a.attempts - b.attempts;
  });

  records = records.slice(0, 10);

  localStorage.setItem('bulls-cows-records', JSON.stringify(records));
  renderRecords(records);
}
const recordsContainer = createElement('div', '', 'records-container');

function renderRecords(
  records: { attempts: number; time: number; length: number; base: number }[],
) {
  recordsContainer.textContent = '';

  if (records.length === 0) return;

  const title = createElement('h3', 'Leaderboard', 'records-title');
  recordsContainer.append(title);

  const baseNames: Record<number, string> = { 2: 'bin', 8: 'oct', 10: 'dec', 16: 'hex' };

  for (const [index, rec] of records.entries()) {
    const sysName = baseNames[rec.base];
    const text = `${index + 1}. [${sysName}, len:${rec.length}] - ${rec.attempts} attempts, ${rec.time}s`;
    const p = createElement('p', text, 'record-item');
    recordsContainer.append(p);
  }
}
const savedRecords = localStorage.getItem('bulls-cows-records');
if (savedRecords) {
  renderRecords(JSON.parse(savedRecords));
}
document.body.append(
  title,
  startButton,
  lengthSelect,
  systemSelect,
  userInput,
  userButton,
  errorDiv,
  historyContainer,
  resetButton,
  recordsContainer,
);
