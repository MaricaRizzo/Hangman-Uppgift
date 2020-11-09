// Variables
let level = 0;
let randomWords = [];
let easyWords = ['apple', 'gene', 'flag', 'candy', 'taste'];
let mediumWords = ['article', 'trident', 'corrupted', 'basically', 'computer'];
let hardWords = ['aposthrophe', 'justification', 'abruptly', 'jinx', 'buckaroo'];
let answer = '';
let maxWrong = 5;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let won = 0;
let lost = 0;


// Start game on click
document.getElementById('startBtn').addEventListener('click', () =>{
    document.getElementById('startBtnContainer').classList.toggle('hide');
    document.getElementById('gameContainer').classList.toggle('hide');
    hideSvg();
    getWord();
})



// Change game difficulty and push correct array 
function changeDifficulty(difficulty = 0) {
    level = difficulty
    randomWords = [];
    
    if (level === 1) {
        randomWords = easyWords
    } else if (level === 0 ||level === 2) {
        randomWords = mediumWords
    } else if (level === 3){
        randomWords = hardWords
    }  
}

// Give random word from list of words
function getWord() {
    answer = randomWords[Math.floor(Math.random()*randomWords.length)]; 
}  

//Select easy word
document.getElementById('easy').addEventListener('click', () => {
    changeDifficulty(1);
    mistakes = 0;
    guessed = [];
    getWord()
    guessedWord()
    generateButtons()
    updateMistakes()
    hideSvg()
})


//Select medium word
document.getElementById('medium').addEventListener('click', () => {
    changeDifficulty(2);
    mistakes = 0;
    guessed = [];
    getWord()
    guessedWord()
    generateButtons()
    updateMistakes()
    hideSvg()
})


// Select hard word
document.getElementById('hard').addEventListener('click', () => {
    changeDifficulty(3);
    mistakes = 0;
    guessed = [];
    getWord()
    guessedWord()
    generateButtons()
    updateMistakes()
    hideSvg()
})




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





//Toggle svg parts 
function hideSvg() {
    document.getElementById('hangman').src = "./Images/hangman" + mistakes + ".svg";
}


// New word button
document.getElementById('restart-btn').addEventListener('click', () =>{

    mistakes = 0;
    guessed = [];
    getWord()
    guessedWord()
    generateButtons()
    updateMistakes()
    hideSvg()

 });




// Check for game result
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('alphabet').innerHTML = 'You won!';
        won++;
        updateWon()
    }
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById('alphabet').innerHTML = 'You lost!' + "<br />" + 'The correct word was ' + answer;
        lost++;
        updateLost()
    }
}


// Update score count
function updateWon() {
    document.getElementById('won').innerHTML = won;
}
function updateLost() {
    document.getElementById('lost').innerHTML = lost;
}



// Call functions
changeDifficulty();
getWord();
guessedWord();
generateButtons();
