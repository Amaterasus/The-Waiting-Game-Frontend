// API
const BASE_URL = "http://localhost:3000/drinks"

// Dom stuff
const main = document.getElementById("main");
main.className = "container";

const totalDiv = document.getElementById("total");
totalDiv.className = "sticky";
const totalFont = document.createElement("h3");
totalFont.innerText = `ORDER TOTAL: £0.00`;
totalDiv.append(totalFont);

let itemArray = [];

document.addEventListener("DOMContentLoaded", () => {
    
    fetch(BASE_URL)
    .then(res => res.json())
    .then(drinks => renderDrinks(drinks))
    
    const renderDrinks = (drinks) => {
        drinks.forEach(drink => renderDrink(drink));
    }

    const renderDrink = (drink) => {
        const drinksRow = document.createElement("div")
        drinksRow.className = "row";

        const drinkDiv = document.createElement("div");
        drinkDiv.className = "col-sm-4";

        const title = document.createElement("h2")
        title.innerText = drink.name

        const image = document.createElement("img")
        image.src = drink.img_url
        image.width = "230"
        image.height = "300"

        const description = document.createElement("p")
        description.innerText = drink.description

        const price = document.createElement("p")
        price.innerText = `£${drink.price.toFixed(2)}`

        const quantitySelect = document.createElement("select");
      
        for (let i = 0; i <= 6; i++) {
            const quantityOption = document.createElement("option");
            quantityOption.innerText = i;
            quantitySelect.append(quantityOption);
          }

        quantitySelect.addEventListener("change", (e) => {
            getItemPrice(drink, parseInt(e.target.value));
        })

        drinkDiv.append(title, image, description, price, quantitySelect);
        drinksRow.append(drinkDiv);
        main.append(drinksRow);
    }

    function getItemPrice(drink, productQuantity) {
        const itemPrice = drink.price * productQuantity;
        itemArray.push(itemPrice);
        renderRunningTotal(drink, productQuantity)
    }

    function renderRunningTotal(drink, productQuantity) {
        let runningTotal = itemArray.reduce((total, amount) => total + amount); 
        totalFont.innerText = `ORDER TOTAL: £${runningTotal}`
        totalDiv.append(totalFont)
        renderSelectedItems(drink, productQuantity);
    }

    function renderSelectedItems(drink, productQuantity) {
        const drinkList = document.createElement("p");
        drinkList.innerText = `${productQuantity} * ${drink.name}`;
        totalDiv.appendChild(drinkList);
    }
})
