/*
  Name: Shauna Ayscue
  Date: 02.18.2025
  CSC 372-01

  This is the scripts.js file for the "Dine On UNCG Campus" website. 
  It handles the functionality of changing image sizing and generates a description of the selected dish and costs.
  It also adds and removes dishes to the meal plan, as well as updating the total price.
*/
const dishImages = document.querySelectorAll('.dish img');
const dishInfo = document.getElementById('dish-info');
const dishName = document.getElementById('dish-name');
const dishDescription = document.getElementById('dish-description');
const dishPrice = document.getElementById('dish-price');

/**
 * Expands the image clicked by adding a class for enlarging the image
 * and displays additional information about the dish.
 *
 * @param {Event} event - The click event triggered on the dish image.
 */
function expandImage(event) {
    const clickedImage = event.currentTarget;

    const currentBigImage = document.querySelector('.dish img.big');
    if (currentBigImage) {
        currentBigImage.classList.remove('big');
    }

    clickedImage.classList.add('big');

    const name = clickedImage.parentElement.getAttribute('data-name');
    const description = clickedImage.parentElement.getAttribute('data-description');
    const price = clickedImage.parentElement.getAttribute('data-price');

    dishName.textContent = name;
    dishDescription.textContent = description;
    dishPrice.textContent = price;

    dishInfo.style.display = 'block';
}

dishImages.forEach(image => {
    image.addEventListener("click", expandImage);
});


document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", addToMealPlan);
});

/**
 * Adds the selected dish to the meal plan or updates the existing dish's price.
 *
 * @param {Event} event - The click event triggered on the "Add" button.
 * @return {void}
 */
let totalPrice = 0;

function addToMealPlan(event) {
    const dishItem = event.target.closest("li");
    const dishName = dishItem.dataset.name;
    const dishPrice = parseFloat(dishItem.dataset.price);

    const mealList = document.querySelector("#selected-meals");
    let existingItem = mealList.querySelector('[data-name="' + dishName + '"]');

    if (existingItem) {
        let quantitySpan = existingItem.querySelector(".quantity");
        let quantity = parseInt(quantitySpan.textContent) + 1;
        quantitySpan.textContent = quantity;

        let currentPrice = parseFloat(existingItem.dataset.price);
        let updatedPrice = (currentPrice + dishPrice).toFixed(2);
        existingItem.dataset.price = updatedPrice;
        existingItem.querySelector("span").textContent = dishName;
    } else {
        const mealItem = document.createElement("li");
        mealItem.dataset.name = dishName;
        mealItem.dataset.price = dishPrice;

        const textSpan = document.createElement("span");
        textSpan.textContent = dishName;

        const quantitySpan = document.createElement("span");
        quantitySpan.classList.add("quantity");
        quantitySpan.textContent = "1";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeFromMealPlan(mealItem);
        });

        mealItem.appendChild(textSpan);
        mealItem.appendChild(quantitySpan);
        mealItem.appendChild(removeBtn);
        mealList.appendChild(mealItem);
    }

    totalPrice += dishPrice;
    const fullPrice = document.querySelector("#total-price");
    fullPrice.textContent = totalPrice.toFixed(2);
}

/**
 * Removes a meal item from the meal plan and updates the total price.
 *
 * @param {HTMLElement} mealItem - The meal item to be removed from the meal plan.
 * @return {void}
 */
function removeFromMealPlan(mealItem) {
    const itemPrice = parseFloat(mealItem.dataset.price);

    totalPrice -= itemPrice;
    const fullPrice = document.querySelector("#total-price");
    fullPrice.textContent = totalPrice.toFixed(2);

    mealItem.remove();
}
