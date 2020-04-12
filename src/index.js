// API
const BASE_URL = "http://localhost:3000/drinks"
const USER_URL = "http://localhost:3000/users"

//user stuff

const user = false 

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
    
    const orderDrinkButton = document.createElement("button")
    orderDrinkButton.innerText = "Order Drinks"
    main.append(orderDrinkButton)

    orderDrinkButton.addEventListener('click', event => {
        loginPage()
    })
    
    const loginPage = () => {
        const aDiv = document.createElement("div")

        // const title  = document.createElement("h3")
        // title.innerText = "Whats your Username and Table Number ?"

        const br = document.createElement("br")
        const form = document.createElement("form")
        const inputButton = document.createElement("input")
        inputButton.type = "submit"
        inputButton.value = "submit"
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
         }).then(resp => fetch(BASE_URL).then(res => res.json()).then(drinks => renderDrinks(drinks)))

        
    }
    
    const renderDrinks = (drinks) => {
        // main.innerText = ""
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

        newDiv.append(stylingDiv, titleDiv, imageDiv, descriptionDiv, priceDiv, addDrinkDiv)
        main.append(newDiv)
    }

    function getItemPrice(drink) {
        const itemPrice = drink.price;
        itemArray.push(itemPrice);
        renderRunningTotal(drink)
        // debugger
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
