const main = document.getElementById("main")
const addBtn = document.getElementById("add")
const doubleBtn = document.getElementById("double")
const millionairesBtn = document.getElementById("millionaires")
const sortBtn = document.getElementById("sort")
const calculateBtn = document.getElementById("calculate-wealth")

getRandomUser()
getRandomUser()

let data = []

async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api")
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
}

function addData(obj) {
    data.push(obj)

    updateDom()
}
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDom()
}

function sort() {
    data.sort((a, b) => b.money - a.money)
    updateDom()
}

function millionaires() {
    data = data.filter(user => user.money > 1000000)
    updateDom()
}

function calculate() {
    const wealth = data.reduce((acc, user) => (acc = acc + user.money), 0)
    const wealthElement = document.createElement("div")
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)
}

function updateDom(providedData = data) {
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>"
    providedData.forEach(item => {
        const element = document.createElement("div")
        element.classList.add("person")
        element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addBtn.addEventListener("click", getRandomUser)
doubleBtn.addEventListener("click", doubleMoney)
sortBtn.addEventListener("click", sort)
millionairesBtn.addEventListener("click", millionaires)
calculateBtn.addEventListener("click", calculate)
