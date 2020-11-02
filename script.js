// Variables
let button = document.getElementById('btn');

// Give random word from list of words
let randomWords = ['Elephant', 'Presumptuos', 'Article', 'Trident', 'Creature', 'Justification'];
let getWord = randomWords[Math.floor(Math.random()*randomWords.length)];


// Add event listener to #btn to start game
button.addEventListener('click', () => {
    document.getElementById('btn').classList.toggle('hide');

// Add li for each letter in ranadom word
    let ul = document.getElementById("word");
    let li = document.createElement("li");
    for (let i = 0; i < getWord.length; i++) {
        wordLetters = document.createElement('li');
        ul.appendChild(wordLetters)
        if (getWord[i] === "-") {
            wordLetters.innerHTML = "-";
            space = 1;
        } else {
            wordLetters.innerHTML = "_";
        }
        console.log(getWord.charAt(i));
}

});




// Create alphabet ul











// Record typed letters




// Find letters in word




// If correct word, write letter in #word




// If not, save used letter in #letters




// End game after 5 wrong letters