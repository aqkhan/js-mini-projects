const word = document.getElementById("word")
const text = document.getElementById("text")
const timeElement = document.getElementById("time")
const scoreElement = document.getElementById("score")
const endGameElement = document.getElementById("end-game-container")
const settings = document.getElementById("settings")
const settingsBtn = document.getElementById("settings-btn")
const settingsForm = document.getElementById("settings-form")
const difficultSelect = document.getElementById("difficulty")

const words =
    [
        'sigh',
        'tense',
        'airplane',
        'ball',
        'pies',
        'juice',
        'warlike',
        'bad',
        'north',
        'dependent',
        'steer',
        'silver',
        'highfalutin',
        'superficial',
        'quince',
        'eight',
        'feeble',
        'admit',
        'drag',
        'loving'
    ]

let randomWord, score = 0, time = 10
difficulty = localStorage.getItem("difficulty") != null ? localStorage.getItem("difficulty") : "medium"
difficultSelect.value = localStorage.getItem("difficulty") != null ? localStorage.getItem("difficulty") : "medium"
text.focus()
const timeInterval = setInterval(updateTime, 1000)


function updateTime() {
    time--
    timeElement.innerHTML = time + "s"

    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}
function gameOver() {
    endGameElement.innerHTML = `<h1>Time Up</h1> <p>Your score was ${score}</p>
    <button onclick="location.reload()">Play Again</button>`
    endGameElement.style.display = "flex"

}
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

addWordToDom()

text.addEventListener("input", e => {
    const insertedText = e.target.value
    if (insertedText === randomWord) {
        addWordToDom()

        score++
        scoreElement.innerHTML = score
        e.target.value = ""

        if (difficulty === "easy") {
            time = time + 6
        }
        else if (difficulty === "medium") {
            time = time + 4
        }
        else {
            time = time + 2
        }


        updateTime()
    }
})

settingsBtn.addEventListener("click", () => { settings.classList.toggle("hide") })
settingsForm.addEventListener("change", e => {
    difficulty = e.target.value
    localStorage.setItem("difficulty", difficulty)
})