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
        // main.innerText = ""
        loginPage()
    })
    
    const loginPage = () => {
        const aDiv = document.createElement("div")

        const title  = document.createElement("h3")
        title.innerText = "Whats your Username and Table Number ?"

        const br = document.createElement("br")
        const form = document.createElement("form")
        const inputButton = document.createElement("input")
        inputButton.type = "submit"
        inputButton.value = "submit"
        const label1 = document.createElement("label")
        label1.innerText = "Username"
        const inputName = document.createElement("input")
        inputName.name = "username"
        const label2 = document.createElement("label")
        label2.innerText = "Table Number"
        const inputTable = document.createElement("input")
        inputTable.name = "tablenumber"

        label1.append(inputName)
        label2.append(inputTable)
        form.append(label1,label2, inputButton)
        aDiv.append(title,br, form)
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
        description.innerText = drink.description
        descriptionDiv.append(description)

        const superInnerDiv = document.createElement("div")
        superInnerDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const priceDiv = document.createElement("div")
        priceDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
        const price = document.createElement("p")
        price.innerText = `£${drink.price.toFixed(2)}`
        priceDiv.append(price)

        const quantitySelectDiv = document.createElement("div");
        quantitySelectDiv.className = "col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"
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

        superInnerDiv.append(priceDiv, quantitySelectDiv)
        // innerBoxDiv.append(descriptionDiv, superInnerDiv)
        boxDiv.append(titleDiv, descriptionDiv, superInnerDiv)
        newDiv.append(imageDiv, boxDiv)
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
