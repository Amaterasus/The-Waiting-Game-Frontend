// API
const BASE_URL = "http://localhost:3000/drinks"
const USER_URL = "http://localhost:3000/users"

//user stuff

const user = false 

// Dom stuff
const main = document.getElementById("main");
const totalDiv = document.getElementById("total");

const totalText = document.createElement("h6");
totalText.innerText = `ORDER TOTAL: £0.00`;

const orderNowDiv = document.getElementById("order");
orderNowDiv.className = "order";
const placeOrderButton = document.createElement("button");
placeOrderButton.innerText = "Place Order";
placeOrderButton.className = "btn btn-danger";

const getDrinks = document.getElementById("Get-drinks")
const game = document.getElementById("Play")

let itemArray = [];


document.addEventListener("DOMContentLoaded", () => {
    getDrinks.addEventListener("click", e => {
        e.preventDefault()
        getDrinks.classList.add("active")
        game.classList.remove("active")
        loginPage()
    })

    game.addEventListener("click", e => {
        e.preventDefault()
        getDrinks.classList.remove("active")
        game.classList.add("active")
    })

    
    const loginPage = () => {
        main.innerText = ""
        const aDiv = document.createElement("div")
        const br = document.createElement("br")
        const form = document.createElement("form")
        const inputButton = document.createElement("input")
        inputButton.type = "submit"
        inputButton.value = "Submit"
        const label1 = document.createElement("label")
        label1.innerText = "Name:  "
        const inputName = document.createElement("input")
        inputName.name = "username"
        inputName.placeholder = "Enter name..."
        const label2 = document.createElement("label")
        label2.innerText = "Table Number:   "
        const inputTable = document.createElement("input")
        inputTable.placeholder = "Enter table number..."
        inputTable.name = "tablenumber"

        label1.append(inputName)
        label2.append(inputTable)
        form.append(label1,label2, inputButton)
        aDiv.append(br, form)
        main.append(aDiv)

        form.addEventListener("submit", event=> {
            event.preventDefault()
            const name = event.target.username.value
            const number = event.target.tablenumber.value
            createUser(name,number)
        })
    }


    const createUser = (name, number) => {
         fetch(USER_URL, {
             method: "POST",
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify({
                name: name,
                table_number: number
             })
         }).then(resp => resp.json())
         .then(fetch(BASE_URL)
         .then(res => res.json())
         .then(drinks => renderDrinks(drinks)));
    }
    
    const renderDrinks = (drinks) => {
        main.innerText = ""
        totalDiv.className = "sticky h-100";
        totalDiv.append(totalText);
       drinks.forEach(drink => renderSingleDrink(drink));
    }

    const renderSingleDrink = (drink) => {
        const newDiv = document.createElement("div")
        newDiv.className = "row"

        const imageDiv = document.createElement("div")
        imageDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"

        const image = document.createElement("img")
        image.className = "img-responsive"
        image.height = 150
        imageDiv.append(image)
        image.src = drink.img_url

        const boxDiv = document.createElement("div")
        boxDiv.className = "row col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10"

        const titleDiv = document.createElement("div")
        titleDiv.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        const title = document.createElement("h2")
        title.innerText = drink.name
        titleDiv.append(title)

        
        const innerBoxDiv = document.createElement("div")
        innerBoxDiv.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        const descriptionDiv = document.createElement("div")
        descriptionDiv.className = "col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12"
        const description = document.createElement("p")
        description.innerText = drink.description
        descriptionDiv.append(description)

        const innerDiv = document.createElement("div")
        innerDiv.className = "row col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 text-center align-items-center"
        
        const priceDiv = document.createElement("div")
        const price = document.createElement("p")
        priceDiv.className = "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-xs-1"
        price.innerText = `£${drink.price.toFixed(2)}`
        priceDiv.append(price)

        const addDrinkDiv = document.createElement("div");
        addDrinkDiv.className = "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-xs-1"
        const addDrinkButton = document.createElement("button");
        addDrinkButton.className = "btn btn-success"
        addDrinkDiv.append(addDrinkButton)
        addDrinkButton.innerText = "Add to Cart";

        addDrinkButton.addEventListener("click", (e) => {
            getItemPrice(drink, parseInt(e.target.value));
        })


        innerDiv.append(priceDiv, addDrinkDiv)
        // innerBoxDiv.append(descriptionDiv, superInnerDiv)
        boxDiv.append(titleDiv, descriptionDiv, innerDiv)
        newDiv.append(imageDiv, boxDiv)
        main.append(newDiv)
    }

    function getItemPrice(drink) {
        const itemPrice = drink.price;
        itemArray.push(itemPrice);
        renderRunningTotal(drink);
    }

    function renderRunningTotal(drink, productQuantity) {
        let runningTotal = itemArray.reduce((total, amount) => (total + amount)); 
        runningTotal = runningTotal.toFixed(2)
        totalText.innerText = `ORDER TOTAL: £${runningTotal}`;

        renderSelectedItems(drink, productQuantity);
        totalDiv.append(totalText);
        orderNowDiv.append(placeOrderButton);
    }

    function renderSelectedItems(drink, productQuantity) {
        const drinkList = document.createElement("span");
        const drinkBr = document.createElement("br");
        drinkList.innerText = `1 * ${drink.name}`;
        totalDiv.append(drinkList, drinkBr);
    }
})
