const main = document.querySelector("main")
const voiceSelect = document.getElementById("voices")
const textarea = document.getElementById("text")
const readBtn = document.getElementById("read")
const toggleBtn = document.getElementById("toggle")
const closeBtn = document.getElementById("close")

const data = [
    {
        image: "./img/drink.jpg",
        text: "I'm thirsty"
    },
    {
        image: "./img/food.jpg",
        text: "I'm hungry"
    },
    {
        image: "./img/tired.jpg",
        text: "I'm tired"
    },
    {
        image: "./img/hurt.jpg",
        text: "I'm hurt"
    },
    {
        image: "./img/happy.jpg",
        text: "I'm happy"
    },
    {
        image: "./img/angry.jpg",
        text: "I'm angry"
    },
    {
        image: "./img/sad.jpg",
        text: "I'm sad"
    },
    {
        image: "./img/scared.jpg",
        text: "I'm scared"
    },
    {
        image: "./img/outside.jpg",
        text: "I want to go outside"
    },
    {
        image: "./img/home.jpg",
        text: "I want to go home"
    },
    {
        image: "./img/school.jpg",
        text: "I want to go to school"
    },
    {
        image: "./img/grandma.jpg",
        text: "I want to go to grandmas"
    }
]

data.forEach(createBox)

function createBox(item) {
    const box = document.createElement("div")
    const { image, text } = item
    box.classList.add("box")
    box.innerHTML = `
    <img src="${image}" alt="${text}" />
     <p class="info">${text}</p>`

    box.addEventListener("click", () => {
        setTextMessage(text)
        speakText()

        box.classList.add("active")
        setTimeout(() => box.classList.remove("active"), 800)
    })
    main.appendChild(box)
}

const message = new SpeechSynthesisUtterance()

let voices = []

function getVoices() {
    voices = speechSynthesis.getVoices()
    voices.forEach(voice => {
        const option = document.createElement("option")
        option.value = voice.name
        option.innerText = `${voice.name}${voice.lang}`
        voiceSelect.appendChild(option)
    })
}

function setTextMessage(text) {
    message.text = text
}

function speakText() {
    speechSynthesis.speak(message)
}

function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

speechSynthesis.addEventListener("voiceschanged", getVoices)
toggleBtn.addEventListener("click", () => {
    document.getElementById("text-box").classList.toggle("show")
})
closeBtn.addEventListener("click", () => {
    document.getElementById("text-box").classList.remove("show")
})
voiceSelect.addEventListener("change", setVoice)
readBtn.addEventListener("click", () => {
    setTextMessage(textarea.value)
    speakText()
})
getVoices()