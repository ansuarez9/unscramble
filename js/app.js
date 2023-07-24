// 115 words; last word is spaniards
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
    'shooters', 'spaniards'
];

let playableList = [];
let chosenWord = '';
let attempts;
let showInstructions = false;

const submitBtn = document.getElementById('submit-action');
const startBtn = document.getElementById('start-game');
const outputContainer = document.getElementById('typewritter-output');
const userInput = document.getElementById('user-input');
const repeatBtn = document.getElementById('repeat');
const instructionsLink = document.getElementById('instructions');
const instructionModalEl = document.getElementById('instruction-modal');

submitBtn.addEventListener('click', handleSubmitClick);
startBtn.addEventListener('click', handleStartGame);
repeatBtn.addEventListener('click', handleRepeatAction);
userInput.addEventListener('keypress', handleKeyPress)
instructionsLink.addEventListener('click', handleInstructionsClick);
instructionModalEl.addEventListener('click', handleInstructionsClick);

function randomTimeout() {
    return Math.floor(Math.random() * 1500);
}

function handleInstructionsClick() {
    const instructionModalEl = document.getElementById('instruction-modal');
    showInstructions = !showInstructions;

    if(showInstructions){
        instructionModalEl.classList.remove('display-none');
        instructionModalEl.classList.remove('hide-modal');
        instructionModalEl.classList.add('show-modal');
    } else {
        instructionModalEl.classList.add('hide-modal');

        setTimeout(() => {
            instructionModalEl.classList.add('display-none');
            instructionModalEl.classList.remove('show-modal');
        }, 250);
    }
}

function handleKeyPress(e) {
    if(e.key === 'Enter'){
        handleSubmitClick();
    }
}

function handleRevealAction() {
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

    repeatBtn.setAttribute('disabled', 'disabled');
}

function createPlayableList(playLength) {
    let length = 0;
    while(length < playLength){
        const randomIdx = Math.floor(Math.random() * (words.length));
        const randomWord = words[randomIdx];
        playableList.push(randomWord);
        words = words.filter(w => w !== randomWord);
        length++;
    }
}

function handleStartGame() {
    resetGame();

    if(playableList.length === 0){
        createPlayableList(5);
        startBtn.innerText='Next Word';
    }

    submitBtn.removeAttribute('disabled');

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
        startBtn.innerText='New Game!';
    } else if((correct || attempts === 3) && playableList.length === 1) {
        startBtn.innerText='Final Word in Set';
    }

    if(!correct){
        resultIdEl.classList.add('wrong');

        if(attempts === 3){
            handleRevealAction();
            submitBtn.setAttribute('disabled', 'disabled');
        } else {
            setTimeout(() => {
                handleRepeatAction();
                repeatBtn.removeAttribute('disabled');
            }, 1500);
        }

        attempts++;
    } else {
        resultIdEl.classList.add('correct');
        handleRevealAction()
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

