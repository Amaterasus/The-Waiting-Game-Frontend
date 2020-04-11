// API

const BASE_URL = "http://localhost:3000/drinks"

// Dom stuff

const main = document.getElementById("main")

document.addEventListener("DOMContentLoaded", () => {

    fetch(BASE_URL).then(res => res.json()).then(drinks => renderDrinks(drinks))
    
    const renderDrinks = (drinks) => {
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