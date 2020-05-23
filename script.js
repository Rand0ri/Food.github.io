const TypeWriter = function(txtElement, words, wait = 3000) { 
    this.txtElement = txtElement; 
    this.words = words; 
    this.txt = ''; 
    this.wordIndex = 0; 
    this.wait = parseInt(wait, 10); 
    this.type(); 
    this.isDeleting = false; 
}

// Type Method
TypeWriter.prototype.type = function () {
    // Get the current index of word
    const current = this.wordIndex % this.words.length; 
    // Get the full text of current word
    const fullTxt = this.words[current]; 

    // Check if deleting
    if (this.isDeleting) { 
        // Remove character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add character
       
        this.txt = fullTxt.substring(0, this.txt.length + 1);// Whatever the length is we are adding 1 to it
    }

    
    // Insert span into our html span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 
   
    setTimeout(() => this.type(), 200); 
}

// Init on DOM Load .
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
 
    const txtElement = document.querySelector(".txt-type");

    const words = JSON.parse(txtElement.getAttribute("data-words")); 
    const wait = txtElement.getAttribute("data-wait");
    //Init TypeWriter
    new TypeWriter(txtElement, words, wait);

}

const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  //   Get search term
  const term = search.value;

  //   Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Результат поиска для '${term}': </h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>
Нет результатов поиска. Попробуйте еще раз! <p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID = "${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                 </div>
                `
            )
            .join("");
        }
      });
    //   Clear search text
    search.value = "";
  } else {
    alert("Пожалуйста введите критерий поиска");
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class ="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
        <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}<p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}<p>` : ""}
        </div>
        <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
        </div>
  </div>
  `;
}

// Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
