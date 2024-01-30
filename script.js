let randomNumber = Math.round(Math.random() * 100 + 1);
const submit = document.querySelector('#subt')
const userInput = document.querySelector("#guessField")
const guesses = document.querySelector(".guesses")
const remainingSlots = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")
const startOver = document.querySelector(".resultParas")

const p = document.createElement('p')

let prevGuess = []
let numGuesses = 1
let playGame = true
let attempts = 10;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault()
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter valid number!")
    } else if (guess < 1) {
        alert("Please enter number greater than 1.")
    }
    else if (guess > 100) {
        alert("Please enter number less than 100.")
    } else {
        prevGuess.push(guess)
        if (numGuesses === 11) {
            displayGuesses(guess)
            displayMessage(`Game Over. Random Number was ${randomNumber}`)
            endGame()
        } else {
            displayGuesses(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if (attempts === 0) {
        displayMessage(`Game Over! Random number was ${randomNumber}`)
    } else if (guess === randomNumber) {
        displayMessage(`<h2 style="color:green">Congratulation! You Guessed it. in ${numGuesses - 1} Attempts.</h2>`)
        endGame()
    } else if (guess < randomNumber) {
        displayMessage(`Number is TOO Low!`)
    } else if (guess > randomNumber) {
        displayMessage(`Number is TOO High!`)
    }
}

function displayGuesses(guess) {
    userInput.value = ""
    guesses.innerHTML += `[${guess}] `
    attempts--;
    numGuesses++;
    if (attempts === 0) {
        endGame()
    }
    remainingSlots.innerHTML = `${11 - numGuesses}`
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2 style="color:red">${message}</h2>`
}

function endGame() {
    userInput.value = ""
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = "<h2 id='newGame'>Start new Game</h2>"
    p.style.cursor = "pointer"
    p.style.border = "1px solid black"
    p.style.borderRadius = "5px"
    p.style.color = "black"
    p.style.textAlign = "center"
    p.style.padding = "10px 0"
    startOver.appendChild(p)
    playGame = false;
    newGame()
}

function newGame() {
    const newGameButton = document.querySelector("#newGame")
    newGameButton.addEventListener('click', function (e) {
        randomNumber = Math.round(Math.random() * 100 + 1);
        prevGuess = []
        numGuesses = 1;
        numGuesses = 1
        guesses.innerHTML = ''
        remainingSlots.innerHTML = `${11 - numGuesses}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p);
        displayMessage("")
        playGame = true
    })
}
