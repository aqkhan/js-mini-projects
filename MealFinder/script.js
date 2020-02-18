const search = document.getElementById("search")
const random = document.getElementById("random")
const mealsElement = document.getElementById("meals")
const submit = document.getElementById("submit")
const resultHeading = document.getElementById("result-heading")
const singleMealElement = document.getElementById("single-meal")


function searchMeal(e) {
    e.preventDefault()
    singleMealElement.innerHTML = ""
    const term = search.value
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search result for "${term}":</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There is no Data. Please try Again!</p>`
                }
                else {
                    mealsElement.innerHTML = data.meals.map(meal =>
                        `<div class="meal"> 
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                    </div>`
                    ).join("")


                }
            })
        search.value = ""
    }
    else {
        alert("Please Enter a search name")
    }
}

function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealDom(meal)
        })
}

function addMealDom(meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }

    }
    singleMealElement.innerHTML = `<div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main"> <p>${meal.strInstructions}</p>
        <h2> Ingredients </h2>
        <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        </div> 
    </div>`

}
function getRandom() {
    mealsElement.innerHTML = ""
    resultHeading.innerHTML = ""
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            addMealDom(meal)
        })
}

submit.addEventListener("submit", searchMeal)
random.addEventListener("click", getRandom)
mealsElement.addEventListener("click", e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains("meal-info")
        }
        else {
            return false
        }
    })

    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid")
        getMealById(mealID)
    }
})