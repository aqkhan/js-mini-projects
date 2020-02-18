const msgElement = document.getElementById("msg")
const randomNum = getRandomNumber()

console.log(randomNum)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

recognition.start()

function onSpeak(e) {
    const msg = e.results[0][0].transcript
    writeMessage(msg)
    checkNumber(msg)
}

function writeMessage(msg) {
    msgElement.innerHTML = `<div> you said</div>
        <span class="box">${msg}</span>`
}

function checkNumber(msg) {
    const num = +msg
    if (Number.isNaN(num)) {
        msgElement.innerHTML += `<div>This is not a valid number</div>`
        return
    }
    if (num < 1 || num > 100) {
        msgElement.innerHTML += `<div>Number must be between 1 and 100</div>`
        return
    }

    if (num === randomNum) {
        document.body.innerHTML = `<h2>You have guessed the number! <br><br> It was ${num}</h2>
        <button class="play-again" id="play-again"> Play Again? </button>`
    }
    else if (num > randomNum) {
        msgElement.innerHTML += `<div>Go Lower</div>`
    }
    else {
        msgElement.innerHTML += `<div>Go Higher</div>`
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

recognition.addEventListener("result", onSpeak)
recognition.addEventListener("end", () => recognition.start())
document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") {
        window.location.reload()
    }
})