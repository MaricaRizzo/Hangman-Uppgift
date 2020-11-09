// Variables
let randomWords = ['elephant', 'presumptuos', 'article', 'trident', 'creature', 'justification'];
let answer = '';
let maxWrong = 5;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

// Start game on click
document.getElementById('startBtn').addEventListener('click', () =>{
    document.getElementById('startBtnContainer').classList.toggle('hide');
    document.getElementById('gameContainer').classList.toggle('hide');
    hideSvg();
})


// Give random word from list of words
function getWord() {
    answer = randomWords[Math.floor(Math.random()*randomWords.length)]; 
}  



// Split guess word 
// Fill in word with guessed letter or
// Create empty cells 
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : '_')).join('');

    document.getElementById('word').innerHTML = wordStatus;
}



// Create alphabet buttons
function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
        `
        <button
            class = "btn"
            id = '` + letter + `'
            onClick = "handleGuess('` + letter + `')"
        >
        ` + letter + `
        </button>
        `).join('');

        document.getElementById('alphabet').innerHTML = buttonsHTML;
}



// Update letters for right guesses
function handleGuess(chosenLetter ) {
    if (guessed.indexOf(chosenLetter) === -1 ) {
        guessed.push(chosenLetter)
    } else {
        null;
    } 

    document.getElementById(chosenLetter).setAttribute('disabled', true);


    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        hideSvg();
    }
}



// Update wrong guesses
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes
}

document.getElementById('maxWrong').innerHTML = maxWrong;



// Check for game result ---> not working
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('alphabet').innerHTML = 'You won!'
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('alphabet').innerHTML = 'You lost!'
    }
}

// to toggle svg parts 
function hideSvg() {
    document.getElementById('hangman').src = "./Images/hangman" + mistakes + ".svg";
}

document.getElementById('restart-btn').addEventListener('click', () =>{

    mistakes = 0;
    guessed = [];
    getWord()
    guessedWord()
    generateButtons()
    updateMistakes()
    hideSvg()

 });

// Call functions
getWord();
guessedWord();
generateButtons();