const words = [
    'hello', 'blue', 'estelle', 'anniversary', 'ring', 'wedding', 'honey', 'john', 'horse', 'mouse', 'house', 
    'train', 'appropriate', 'architecture', 'world', 'moon', 'poetry', 'microsoft', 'apple', 'saving', 'document',
    'output', 'listening', 'created', 'soccer', 'jamestown', 'district', 'rivalry', 'arlington', 'california',
    'handle', 'situation', 'price', 'grimmace', 'submitted', 'university', 'brain', 'power', 'wisely', 'proud',
    'tortoise', 'turkish', 'cloudy', 'zebra', 'zombie', 'kansas', 'mathematical', 'typewriter', 'sprout', 'traveling',
    'alive', 'alien', 'toils', 'cranes', 'bratty', 'childish', 'orange', 'steelblue', 'jupiter', 'graciously', 'feverishly',
    'brackets', 'transitioning', 'incorrect', 'weeding'
];
let chosenWord = '';
let attempts;

const submitBtn = document.getElementById('submit-action');
const startBtn = document.getElementById('start-game');
const outputContainer = document.getElementById('typewritter-output');
const userInput = document.getElementById('user-input');
// const revealBtn = document.getElementById('reveal');

submitBtn.addEventListener('click', handleSubmitClick);
startBtn.addEventListener('click', handleStartGame);
// revealBtn.addEventListener('click', handleRevealAction);

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

function resetGame() {
    const attemptContainersEls = document.getElementsByClassName('attempt-container');
    const resultEls = document.getElementsByClassName('result');

    attemptContainersEls[0].className = 'attempt-container';
    attemptContainersEls[1].className = 'attempt-container';
    attemptContainersEls[2].className = 'attempt-container';

    resultEls[0].className = 'result';
    resultEls[1].className = 'result';
    resultEls[2].className = 'result';
}

function handleStartGame() {
    resetGame();
    submitBtn.removeAttribute('disabled');

    attempts = 1;
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
    const guess = userInput.value.trim();
    const correct = guess.toLowerCase() === chosenWord.toLowerCase();

    const resultIdEl = document.getElementById(`result-${attempts}`);
    const attemptContainerIdEl = document.getElementById(`attempt-container-${attempts}`);

    if(!correct){
        resultIdEl.classList.add('wrong');

        if(attempts === 3){
            handleRevealAction();
            submitBtn.setAttribute('disabled', 'disabled');
        } else {
            setTimeout(() => {
                handleRepeatAction();
            }, 1000);
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

