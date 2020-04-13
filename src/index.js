// API
const BASE_URL = "http://localhost:3000/drinks"
const USER_URL = "http://localhost:3000/users"

//user stuff

const user = false 

// Dom stuff
const main = document.getElementById("main");
main.className = "container";
const totalDiv = document.getElementById("total");

const totalText = document.createElement("h6");
totalText.innerText = `ORDER TOTAL: £0.00`;

const orderNowDiv = document.getElementById("order");
orderNowDiv.className = "order";
const placeOrderButton = document.createElement("button");
placeOrderButton.innerText = "Place Order";
placeOrderButton.className = "btn btn-danger";





let itemArray = [];


document.addEventListener("DOMContentLoaded", () => {
    const div = document.createElement("div")
    const divRow = document.createElement("div")
    divRow.className = "row"
    div.className = "col-10 offset-1 col-lg-8 offset-lg-2 div-wrapper d-flex justify-content-center align-items-center"
    
    const orderDrinkButton = document.createElement("button")
    orderDrinkButton.className = "btn btn-success";
    orderDrinkButton.innerText = "Order Drinks"
    
    divRow.append(div)
    div.append(orderDrinkButton)
    main.append(divRow)

    orderDrinkButton.addEventListener('click', event => {
        main.innerText =""
        loginPage()
    })
    
    const loginPage = () => {
        main.className = "container h-100"
        const parentDiv = document.createElement("div")
        parentDiv.className = "row h-100 justify-content-center align-items-center"
        const childDiv = document.createElement("div")
        childDiv.className = "col-10 col-md-8 col-lg-6"
        const br = document.createElement("br")
        const form = document.createElement("form")
        const pButton = document.createElement("p")
        const inputButton = document.createElement("input")
        inputButton.className = "btn btn-success"
        inputButton.type = "submit"
        inputButton.value = "submit"
        const label1 = document.createElement("label")
        const p1 = document.createElement("p")
        label1.innerText = "Name:  "
        const inputName = document.createElement("input")
        inputName.name = "username"
        inputName.placeholder = "Enter name..."
        const p2 = document.createElement("p")
        const label2 = document.createElement("label")
        label2.innerText = "Table Number:   "
        const inputTable = document.createElement("input")
        inputTable.placeholder = "Enter table number..."
        inputTable.name = "tablenumber"

        pButton.append(inputButton)
        p1.append(label1, inputName)
        p2.append(label2, inputTable)
        form.append(p1,p2, pButton)
        childDiv.append(br, form)
        parentDiv.append(childDiv)
        main.append(parentDiv)

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
         }).then(resp => fetch(BASE_URL).then(res => res.json()).then(drinks => renderDrinks(drinks)))
          .catch(error => console.log(error));
         
    }
    
    const renderDrinks = (drinks) => {
        main.innerText = ""
        main.className = "container"
        totalDiv.className = "sticky";
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
        descriptionDiv.className = "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8"
        const description = document.createElement("p")
        description.className = "drinks"
        description.innerText = drink.description
        descriptionDiv.append(description)

        const superInnerDiv = document.createElement("div")
        superInnerDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const priceDiv = document.createElement("div")
        priceDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const price = document.createElement("p")
        price.className = "drinks"
        price.innerText = `£${drink.price.toFixed(2)}`
        priceDiv.append(price)

        const addDrinkDiv = document.createElement("div");
        const addDrinkButton = document.createElement("button");

        addDrinkButton.className = "btn btn-success";
        addDrinkButton.type = "button";
        addDrinkButton.innerText = "Add to Cart";
        priceDiv.append(addDrinkButton);

        addDrinkButton.addEventListener("click", (e) => {
            getItemPrice(drink, parseInt(e.target.value));
        })


        superInnerDiv.append(priceDiv)
        // innerBoxDiv.append(descriptionDiv, superInnerDiv)
        boxDiv.append(titleDiv, descriptionDiv, superInnerDiv)
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
