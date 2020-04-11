// API
const BASE_URL = "http://localhost:3000/drinks"

// Dom stuff
const main = document.getElementById("main");
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

        const newDiv = document.createElement("div")
        newDiv.className = "row"

        const stylingDiv = document.createElement("div")
        stylingDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const titleDiv = document.createElement("div")
        titleDiv.className = "col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10"
        const title = document.createElement("h2")
        title.innerText = drink.name
        titleDiv.append(title)

        const imageDiv = document.createElement("div")
        imageDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"

        const image = document.createElement("img")
        image.className = "img-responsive"
        image.height = 150
        imageDiv.append(image)
        image.src = drink.img_url

        const descriptionDiv = document.createElement("div")
        descriptionDiv.className = "col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"
        const description = document.createElement("p")
        description.innerText = drink.description
        descriptionDiv.append(description)


        const priceDiv = document.createElement("div")
        priceDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const price = document.createElement("p")
        price.innerText = `300ml bottle: £${drink.price.toFixed(2)}`
        priceDiv.append(price)

        const quantitySelectDiv = document.createElement("div");
        quantitySelectDiv.className = "col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"
        const quantitySelect = document.createElement("select");
        quantitySelect.class = "btn"
        quantitySelectDiv.append(quantitySelect)
      
        for (let i = 0; i <= 6; i++) {
            const quantityOption = document.createElement("option");
            quantityOption.innerText = i;
            quantitySelect.append(quantityOption);
          }

        quantitySelect.addEventListener("change", (e) => {
            getItemPrice(drink, parseInt(e.target.value));
        })

        newDiv.append(stylingDiv, titleDiv, imageDiv, descriptionDiv, priceDiv, quantitySelectDiv)
        main.append(newDiv)
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