const dragable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")

const people = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

const listItems = []

let dragStartIndex

createList()

function createList() {
    [...people]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li")
            listItem.setAttribute("data-index", index)
            listItem.innerHTML = `<span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>`

            listItems.push(listItem)
            dragable_list.appendChild(listItem)
            addEventListeners()
        })
}

function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index")
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index")
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove("over")
}

function swapItems(fromIndex, toIndex) {
    const item1 = listItems[fromIndex].querySelector(".draggable")
    const item2 = listItems[toIndex].querySelector(".draggable")
    listItems[fromIndex].appendChild(item2)
    listItems[toIndex].appendChild(item1)
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable")
            .innerText.trim()

        if (personName !== people[index]) {
            listItem.classList.add("wrong")
        }
        else {
            listItem.classList.remove("wrong")
            listItem.classList.add("right")
        }
    })
}

function dragEnter() {
    this.classList.add("over")
}

function dragLeave() {
    this.classList.remove("over")
}

function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable")
    const dragListItems = document.querySelectorAll(".draggable-list li")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart)
    })

    dragListItems.forEach(draggable => {
        draggable.addEventListener("dragover", dragOver)
        draggable.addEventListener("drop", dragDrop)
        draggable.addEventListener("dragenter", dragEnter)
        draggable.addEventListener("dragleave", dragLeave)

    })
}
check.addEventListener("click", checkOrder)