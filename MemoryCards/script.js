const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentElement = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionElement = document.getElementById("question");
const addCardBtn = document.getElementById("add-card");
const addContainer = document.getElementById("add-container");
const clearBtn = document.getElementById("clear");
const answerElement = document.getElementById("answer");

let currentActiveCard = 0

const cardsElement = []
const cardsData = getCardsData()
// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ]

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}


function createCard(data, index) {
    const card = document.createElement("div")
    card.classList.add("card")

    if (index === 0) {
        card.classList.add("active")
    }

    card.innerHTML = `<div class="inner-card">
    <div class="inner-card-front">
        <p>
            ${data.question}
        </p>
    </div>
    <div class="inner-card-back">
        <p>
            ${data.answer}
        </p>
    </div>
</div>`

    card.addEventListener("click", () => { card.classList.toggle("show-answer") })

    cardsElement.push(card)
    cardsContainer.appendChild(card)
    updateCurrentText()
}

function updateCurrentText() {
    currentElement.innerText = `${currentActiveCard + 1}/ ${cardsElement.length}`
}

function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"))
    return cards === null ? [] : cards
}

function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards))
    window.location.reload()
}

createCards()

nextBtn.addEventListener("click", () => {
    cardsElement[currentActiveCard].className = "card left"
    currentActiveCard = currentActiveCard + 1
    if (currentActiveCard > cardsElement.length - 1) {
        currentActiveCard = cardsElement.length - 1
    }
    cardsElement[currentActiveCard].className = "card active"
    updateCurrentText()
})

prevBtn.addEventListener("click", () => {
    cardsElement[currentActiveCard].className = "card right"
    currentActiveCard = currentActiveCard - 1
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cardsElement[currentActiveCard].className = "card active"
    updateCurrentText()
})

showBtn.addEventListener("click", () => addContainer.classList.add("show"))
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"))
addCardBtn.addEventListener("click", () => {
    const question = questionElement.value
    const answer = answerElement.value

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }
        createCard(newCard)
        questionElement.value = ""
        answerElement.value = ""

        addContainer.classList.remove("show")
        cardsData.push(newCard)
        setCardsData(cardsData)
    }

})

clearBtn.addEventListener("click", () => {
    localStorage.clear()
    cardsContainer.innerHTML = ""
    window.location.reload()
})