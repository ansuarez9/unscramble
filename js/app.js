const words = ['hello', 'blue', 'estelle', 'marissa', 'ring', 'wedding', 'sally', 'john', 'horse', 'mouse', 'house', 'train', 'appropriate'];
let chosenWord = '';
const submitEvent = document.getElementById('submit-action');
const startBtn = document.getElementById('start-game');
const outputContainer = document.getElementById('typewritter-output');
const userInput = document.getElementById('user-input');
const repeatBtn = document.getElementById('repeat');

submitEvent.addEventListener('click', handleClick);
startBtn.addEventListener('click', handleStartGame);
repeatBtn.addEventListener('click', handleRepeatAction);

function randomTimeout() {
    return Math.floor(Math.random() * 1500);
}

function handleRepeatAction() {
    const hiddenEl = document.getElementsByClassName('hidden-output');
    for(let i = 0; i < hiddenEl.length; i++){
        if(hiddenEl[i].classList.contains('fade-in-output')){
            hiddenEl[i].classList.remove('fade-in-output');
        }

        if(hiddenEl[i].classList.contains('fade-in-result')){
            hiddenEl[i].classList.remove('fade-in-result');
        }
   }

    triggerFadeInEffect();
}

function handleStartGame() {
    outputContainer.innerText = '';
    const randomIdx = Math.floor(Math.random() * (words.length));
    chosenWord = words[randomIdx].toUpperCase();

    chosenWord.split('').forEach(val => {
        insertSpanElement(val);
    });

    triggerFadeInEffect();
}

function handleClick() {
    const guess = userInput.value;
    const correct = guess.toLowerCase() === chosenWord.toLowerCase();

    outputContainer.innerText = correct ? 'CORRECT!' : 'Sorry, Guess Again!';
    outputContainer.className = 'fade-in-result';

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

