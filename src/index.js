// API

const BASE_URL = "http://localhost:3000/drinks"
const USER_URL = "http://localhost:3000/users"

//user stuff

    const user = false 

// Dom stuff

const main = document.getElementById("main")

document.addEventListener("DOMContentLoaded", () => {
    
    const orderDrinkButton = document.createElement("button")
    orderDrinkButton.innerText = "Order Drinks"
    main.append(orderDrinkButton)

    orderDrinkButton.addEventListener('click', event => {
        main.innerText = ""
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
        main.innerText = ""
        drinks.forEach(drink => renderDrink(drink));
    }

    const renderDrink = (drink) => {
        const newDiv = document.createElement("div")

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


        newDiv.append(title, image, description, price)
        main.append(newDiv)
    }

   
})