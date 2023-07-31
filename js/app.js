// 125 words - last word is prisoners
let words = [
    'hello', 'blue', 'estelle', 'anniversary', 'ring', 'wedding', 'honey', 'john', 'horse', 'mouse', 'house', 
    'train', 'appropriate', 'architecture', 'world', 'moon', 'poetry', 'microsoft', 'apple', 'saving', 'document',
    'output', 'listening', 'created', 'soccer', 'jamestown', 'district', 'rivalry', 'arlington', 'california',
    'handle', 'situation', 'price', 'grimace', 'submitted', 'university', 'brain', 'power', 'wisely', 'proud',
    'tortoise', 'turkish', 'cloudy', 'zebra', 'zombie', 'kansas', 'mathematical', 'typewriter', 'sprout', 'traveling',
    'alive', 'alien', 'toils', 'cranes', 'bratty', 'childish', 'orange', 'steelblue', 'jupiter', 'graciously', 'feverishly',
    'brackets', 'transitioning', 'incorrect', 'weeding', 'string', 'marissa', 'roberto', 'football', 'baseball', 'tennis',
    'hockey', 'basketball', 'elements', 'agriculture', 'keyboard', 'guitar', 'classical', 'theft', 'washington', 'amsterdam',
    'europe', 'saturn', 'submit', 'zoology', 'theoretical', 'spices', 'traitor', 'privately', 'scrabble', 'drafts', 'hamster',
    'hipster', 'finish', 'guessing', 'username', 'password', 'middle', 'large', 'extras', 'smaller', 'stratosphere', 'grounded',
    'mustache', 'corollary', 'ivory', 'scanners', 'scalpers', 'ticketmaster', 'immunodeficiency', 'scientology', 'grove', 'path',
    'shooters', 'spaniards', 'wordle', 'descramble', 'decoding', 'jeremiah', 'alice', 'andrew', 'javier', 'greenery',
    'rejuvenation', 'prisoners'
];

let playableList = [];
let chosenWord = '';
let attempts;
let wordCount;
let previousScore;

const submitBtn = document.getElementById('submit-action');
const startBtn = document.getElementById('start-game');
const outputContainer = document.getElementById('typewritter-output');
const userInput = document.getElementById('user-input');
const repeatBtn = document.getElementById('repeat');
const instructionsLink = document.getElementById('instructions');
const instructionModalEl = document.getElementById('instruction-modal');
const finalScoreModalEl = document.getElementById('final-score-modal');
const scoreEl = document.getElementById('score');
const gamesPlayedEl = document.getElementById('gamesPlayed');
const highScoreEl = document.getElementById('highScore');
const averageScoreEl = document.getElementById('averageScore');
const percentageFillEl = document.getElementById('percentage-fill');
const markerTextEl = document.getElementById('marker-text');

submitBtn.addEventListener('click', handleSubmitClick);
startBtn.addEventListener('click', handleStartGame);
repeatBtn.addEventListener('click', handleRepeatAction);
userInput.addEventListener('keypress', handleKeyPress)
instructionsLink.addEventListener('click', () => handleInstructionsClick(instructionModalEl, true));
instructionModalEl.addEventListener('click', () => handleInstructionsClick(instructionModalEl, false));
finalScoreModalEl.addEventListener('click', () => handleInstructionsClick(finalScoreModalEl, false))

function randomTimeout() {
    return Math.floor(Math.random() * 1500);
}

function handleInstructionsClick(modalEl, openModal) {
    if(openModal){
        modalEl.classList.remove('display-none');
        modalEl.classList.remove('hide-modal');
        modalEl.classList.add('show-modal');
    } else {
        modalEl.classList.add('hide-modal');

        setTimeout(() => {
            modalEl.classList.add('display-none');
            modalEl.classList.remove('show-modal');
        }, 250);
    }
}

function handleKeyPress(e) {
    if(e.key === 'Enter'){
        handleSubmitClick();
    }
}

function handleRevealAction(solved) {
    removeWordAtPlayIndicator();
    addWordSolvedIndicator(solved);
    addDisabledAttr(startBtn, false);
    outputContainer.innerText = chosenWord;
    outputContainer.className = 'fade-in-result';
}

function handleRepeatAction() {
    const hiddenEl = document.getElementsByClassName('hidden-output');
    repeatBtn.setAttribute('disabled', 'disabled');

    if(hiddenEl.length === 0) {
        // if user clicked Submit, got the wrong answer, then clicked Repeat
        if(outputContainer.classList.contains('fade-in-result')){
            outputContainer.classList.remove('fade-in-result');
        }

        outputContainer.innerText = '';

        chosenWord.split('').forEach(val => {
            insertSpanElement(val);
        });
    } else {
        for(let i = 0; i < hiddenEl.length; i++){
            if(hiddenEl[i].classList.contains('fade-in-output')){
                hiddenEl[i].classList.remove('fade-in-output');
            }
        }
    }

    triggerFadeInEffect();
}

function resetGame() {
    const attemptContainersEls = document.getElementsByClassName('attempt-container');
    const resultEls = document.getElementsByClassName('result');

    attemptContainersEls[0].className = 'attempt-container';
    attemptContainersEls[1].className = 'attempt-container';
    attemptContainersEls[2].className = 'attempt-container';

    resultEls[0].className = 'result';
    resultEls[1].className = 'result';
    resultEls[2].className = 'result';

    addDisabledAttr(repeatBtn, true);
}

function createPlayableList(playLength) {
    previousScore = 0;
    let length = 0;
    while(length < playLength){
        const randomIdx = Math.floor(Math.random() * (words.length));
        const randomWord = words[randomIdx];
        playableList.push(randomWord);
        words = words.filter(w => w !== randomWord);
        length++;
    }
}

// if disabled is true, then add disabled attribute; else remove disabled attribute
function addDisabledAttr(el, disabled){
    if(disabled){
        el.setAttribute('disabled', 'disabled');
    } else {
        el.removeAttribute('disabled');
    }
}

function handleStartGame() {
    resetGame();

    if(playableList.length === 0){
        createPlayableList(5);
        resetWordSolvedIndicator();
        startBtn.innerText='Next Word';
    }

    wordCount = 5 - playableList.length;

    addDisabledAttr(startBtn, true);
    addDisabledAttr(submitBtn, false);

    attempts = 1;
    if(outputContainer.classList.contains('fade-in-result')) {
        outputContainer.classList.remove('fade-in-result')
    }

    outputContainer.innerText = '';
    const randomIdx = Math.floor(Math.random() * (playableList.length));
    chosenWord = playableList[randomIdx].toUpperCase();
    playableList = playableList.filter(w => w.toUpperCase() !== chosenWord);

    chosenWord.split('').forEach(val => {
        insertSpanElement(val);
    });

    triggerFadeInEffect();
    addWordAtPlayIndicator();
}

function addWordAtPlayIndicator() {
    document.getElementsByClassName('word')[wordCount].classList.add('at-play');
}

function removeWordAtPlayIndicator() {
    document.getElementsByClassName('word')[wordCount].classList.remove('at-play');
}

function addWordSolvedIndicator(solved) {
    const wordEl = document.getElementsByClassName('word')[wordCount];
    wordEl.innerText = calculateWordScore(solved);
    if(solved){
        wordEl.classList.add('solved');
    } else {
        wordEl.classList.add('not-solved');
    }
}

function resetWordSolvedIndicator(){
    const wordEls = document.getElementsByClassName('word');
    wordEls[0].className = 'word';
    wordEls[0].innerText = 'Word';
    wordEls[1].className = 'word';
    wordEls[1].innerText = 'Word';
    wordEls[2].className = 'word';
    wordEls[2].innerText = 'Word';
    wordEls[3].className = 'word';
    wordEls[3].innerText = 'Word';
    wordEls[4].className = 'word';
    wordEls[4].innerText = 'Word';
}

function calculateWordScore(solved) {
    const wordScore = chosenWord.length * (4 - attempts);
    previousScore = solved ? wordScore + previousScore : previousScore;
    return previousScore;
}

function calculateScoreAverage(average, gamesPlayed, score) {
    const newAverage = ((average * gamesPlayed) + score) / (gamesPlayed + 1);
    return newAverage || score;
}

function getHighScore(highScore, score) {
    if(!(!!highScore)) {
        return score;
    }
    return (score > highScore) ? score : highScore;
}

function getHistory(history, score) {
    let percentile = 100;
    if(history) {
        insertIdx = history.findIndex(s => s > score);
        if(insertIdx === -1) {
            // position being at the end
            history = [...history, score];
        } else {
            // position being inserted at (insertIdx + 1) or at beginning
            history.splice(insertIdx, 0, score);
            percentile = (((insertIdx + 1) / history.length) * 100);
        }
    } else {
        // starting the array
        history = [score];
    }

    return ({
        history: history,
        percentile: Math.round(percentile)
    });
}

function finalScoreCalculations(score) {
    const cached = JSON.parse(localStorage.getItem('dscrmbl'));
    const average = calculateScoreAverage(cached?.average, cached?.gamesPlayed, score);
    const gamesPlayed = (cached?.gamesPlayed + 1) || 1;
    const highScore = getHighScore(cached?.highScore, score);
    const historyPercentile = getHistory(cached?.history, score);

    const cachedScore = {
        score: score,
        average: average,
        gamesPlayed: gamesPlayed,
        highScore: highScore,
        history: historyPercentile.history
    }

    localStorage.setItem('dscrmbl', JSON.stringify(cachedScore));

    return {cachedScore, historyPercentile};
}

function showFinalScoreModal(solved) {
    const finalScore = document.getElementsByClassName('word')[4].innerText;
    scoreEl.innerText = finalScore;

    const {cachedScore, historyPercentile} = finalScoreCalculations(Number(finalScore));
    gamesPlayedEl.innerText = cachedScore.gamesPlayed;
    highScoreEl.innerText = cachedScore.highScore;
    averageScoreEl.innerText = Math.round(cachedScore.average);

    finalScoreModalEl.classList.remove('display-none');
    finalScoreModalEl.classList.add('show-modal');

    setTimeout(() => {
        const percentage = `${historyPercentile.percentile}%`;
        percentageFillEl.style.width = percentage;
        percentageFillEl.classList.add('fill-effect');

        markerTextEl.innerText = percentage; // has to be calculated
        markerTextEl.classList.add('marker-text-fade-in');
    }, 1000)
}

function handleSubmitClick() {
    const guess = userInput.value.trim();
    const h5El = document.getElementsByTagName('h5')[0];

    if(
        (!(!!chosenWord) && (!!guess)) || 
        ((!!chosenWord) && !(!!guess)) || 
        !(!!chosenWord) || !(!!guess)){
        document.getElementById('button-text').innerHTML = startBtn.innerText;
        h5El.classList.add('fade-out');

        setTimeout(() => {
            h5El.classList.remove('fade-out');
        }, 2000);
        return;
    }

    const correct = guess.toLowerCase() === chosenWord.toLowerCase();

    const resultIdEl = document.getElementById(`result-${attempts}`);
    const attemptContainerIdEl = document.getElementById(`attempt-container-${attempts}`);

    if((correct || attempts === 3) && playableList.length === 0){
        startBtn.innerText='Start New DSCRMBL!';
    } else if((correct || attempts === 3) && playableList.length === 1) {
        startBtn.innerText='Final Word in Set';
    }

    if(!correct){
        resultIdEl.classList.add('wrong');

        if(attempts === 3){
            handleRevealAction(false);
            addDisabledAttr(submitBtn, true);
        } else {
            setTimeout(() => {
                handleRepeatAction();
                addDisabledAttr(repeatBtn, false);
            }, 1500);
        }

        attempts++;
    } else {
        resultIdEl.classList.add('correct');
        handleRevealAction(true)
    }

    if(playableList.length === 0 && (attempts === 4 || correct)){
        setTimeout(showFinalScoreModal, 1500);
    }

    attemptContainerIdEl.classList.add('rotate-attempt');

    userInput.value = ''
}

function insertSpanElement(val) {
    const el = document.createElement('span');
    el.className="hidden-output"
    el.innerHTML = val;
    outputContainer.appendChild(el);
}

function triggerFadeInEffect() {
    const hiddenEl = document.getElementsByClassName('hidden-output');
    for(let i = 0; i < hiddenEl.length; i++){
        setTimeout(() => {
            hiddenEl[i].className = 'hidden-output fade-in-output';
        }, randomTimeout());
    }
}

