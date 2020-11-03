// Variables
let randomWords = ['elephant', 'presumptuos', 'article', 'trident', 'creature', 'justification'];
let answer = '';
let maxWrong = 5;
let mistakes = 0;
let guessed = [];
let wordStatus = null;



// Start game on click
document.getElementById('startBtn').addEventListener('click', () =>{
    document.getElementById('startBtn').classList.toggle('hide');
    document.getElementById('gameContainer').classList.toggle('hide');
})


// Give random word from list of words
function getWord() {
    answer = randomWords[Math.floor(Math.random()*randomWords.length)]; 
}  



// Split guess word 
// Fill in word with guessed letter or
// Create empty cells 
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : '_')).join(' ');

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
function handleGuess(chosenLetter) {
    if (guessed.indexOf(chosenLetter) === -1) {
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



// Call functions
getWord();
guessedWord();
generateButtons();
