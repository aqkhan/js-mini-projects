const balance = document.getElementById("balance")
const moneyminus = document.getElementById("money-minus")
const moneyplus = document.getElementById("money-plus")
const list = document.getElementById("list")
const amount = document.getElementById("amount")
const form = document.getElementById("form")
const text = document.getElementById("text")

// const dummyTransactions = [
//     { id: 1, text: "Hello", amount: 10 },
//     { id: 2, text: "world", amount: 20 },
//     { id: 3, text: "dummyTransactions", amount: -10 }
// ]

const localStorageTransaction = JSON.parse(localStorage.getItem("transactions"))

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransaction : []

function addTransactionDom(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement("li")
    item.classList.add(transaction.amount < 0 ? "minus" : "plus")
    item.innerHTML = `${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`
    list.appendChild(item)
}

function init() {
    list.innerHTML = ""
    transactions.forEach(addTransactionDom)
    updateValues()
}

function updateValues() {
    const amount = transactions.map(transaction => transaction.amount)
    const total = amount.reduce((acc, item) => (acc = acc + item), 0).toFixed(2)
    const income = amount.filter(item => item > 0).reduce((acc, item) => (acc = acc + item), 0).toFixed(2)
    const expense = (amount.filter(item => item < 0).reduce((acc, item) => (acc = acc + item), 0) * -1).toFixed(2)
    balance.innerHTML = `$${total}`
    moneyminus.innerHTML = `$${expense}`
    moneyplus.innerHTML = `$${income}`
}
function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() === "" || amount.value.trim === "") {
        alert("Please Enter Amount and text")
    }
    else {
        const transaction = {
            id: genId(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionDom(transaction)
        updateValues()
        updateLocalStroage()
        text.value = ""
        amount.value = ""

    }
}
function removeTransaction(id) {
    transactions = transactions.filter(transactions => transactions.id !== id)
    updateLocalStroage()
    init()
}

function genId() {
    return Math.floor(Math.random() * 1000000)
}

function updateLocalStroage() {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}
init()

form.addEventListener("submit", addTransaction)
