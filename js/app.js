const words = [
    'hello', 'blue', 'estelle', 'anniversary', 'ring', 'wedding', 'honey', 'john', 'horse', 'mouse', 'house', 
    'train', 'appropriate', 'architecture', 'world', 'moon', 'poetry', 'microsoft', 'apple', 'saving', 'document',
    'output', 'listening', 'created', 'soccer', 'jamestown', 'district', 'rivalry', 'arlington', 'california',
    'handle', 'situation', 'price', 'grimmace', 'submitted', 'university', 'brain', 'power', 'wisely', 'proud',
    'tortoise', 'turkish', 'cloudy', 'zebra', 'zombie', 'kansas', 'mathematical', 'typewritter', 'sprout', 'traveling',
    'alive', 'alien', 'toils', 'cranes', 'bratty', 'childish', 'orange', 'steelblue', 'jupiter', 'graciously'
];
let chosenWord = '';
let attempts;

const submitBtn = document.getElementById('submit-action');
const startBtn = document.getElementById('start-game');
const outputContainer = document.getElementById('typewritter-output');
const userInput = document.getElementById('user-input');
const repeatBtn = document.getElementById('repeat');
const revealBtn = document.getElementById('reveal');
const attemptsEl = document.getElementById('attempts');

submitBtn.addEventListener('click', handleSubmitClick);
startBtn.addEventListener('click', handleStartGame);
repeatBtn.addEventListener('click', handleRepeatAction);
revealBtn.addEventListener('click', handleRevealAction);

function randomTimeout() {
    return Math.floor(Math.random() * 1500);
}

function handleRevealAction() {
    outputContainer.innerText = chosenWord;
    outputContainer.className = 'fade-in-result';
}

function handleRepeatAction() {
    const hiddenEl = document.getElementsByClassName('hidden-output');

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

function handleStartGame() {
    submitBtn.removeAttribute('disabled');

    attempts = 0;
    attemptsEl.innerText = attempts;
    if(outputContainer.classList.contains('fade-in-result')) {
        outputContainer.classList.remove('fade-in-result')
    }

    outputContainer.innerText = '';
    const randomIdx = Math.floor(Math.random() * (words.length));
    chosenWord = words[randomIdx].toUpperCase();

    chosenWord.split('').forEach(val => {
        insertSpanElement(val);
    });

    triggerFadeInEffect();
}

function handleSubmitClick() {
    const guess = userInput.value;
    const correct = guess.toLowerCase() === chosenWord.toLowerCase();

    outputContainer.innerText = correct ? 'CORRECT!' : 'Sorry, Guess Again!';
    outputContainer.className = 'fade-in-result';

    if(!correct){
        attempts++;
        attemptsEl.innerText = attempts;

        if(attempts === 3){
            handleRevealAction();
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

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

