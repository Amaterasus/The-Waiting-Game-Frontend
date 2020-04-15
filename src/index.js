// API
const BASE_URL = "http://localhost:3000/drinks"
const USER_URL = "http://localhost:3000/users"
const QUIZ_URL = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"

 //user stuff
const user = false

const wait = false 


// Dom stuff
const main = document.getElementById("main");

const totalText = document.createElement("h6");
totalText.innerText = `ORDER TOTAL: £0.00`;

const placeOrderButton = document.createElement("button");
placeOrderButton.innerText = "Place Order";
placeOrderButton.className = "btn btn-danger";

const ulNav = document.querySelector(".navbar-nav")
const getDrinks = document.getElementById("Get-drinks")
const game = document.getElementById("Play")

let itemArray = [];
let flip = true


document.addEventListener("DOMContentLoaded", () => {
    getDrinks.addEventListener("click", e => {
        e.preventDefault()
        getDrinks.classList.add("active")
        game.classList.remove("active")
        loginPage()
        getDrinks.classList.add("disabled")
  })

    game.addEventListener("click", e => {
        e.preventDefault()
        getDrinks.classList.remove("active")
        game.classList.add("active")
        runGame()
        
    })

    
    const loginPage = () => {
        main.innerText = ""
        const anchorDiv = document.createElement("div")
        anchorDiv.className = "container h-100"
        const parentDiv = document.createElement("div")
        parentDiv.className = "offset-lg-3 col-lg-6 row h-100 text-center justify-content-center align-items-center"
        const childDiv = document.createElement("div")
        childDiv.className = "col-4 colour"
        const form = document.createElement("form")
        const pButton = document.createElement("p")
        const inputButton = document.createElement("input")
        inputButton.className = "btn btn-success"
        inputButton.type = "submit"
        inputButton.value = "Submit"
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
        childDiv.append(form)
        parentDiv.append(childDiv)
        anchorDiv.append(parentDiv)
        main.append(anchorDiv)

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
         }).then(parseJSON)
          .catch(error => error.then(msg => {alert(msg.errors)}));
         
    }

    const parseJSON = resp => {
        console.log("this is the response from the server", resp);
        if (resp.ok) {
          return resp.json().then(fetch(BASE_URL).then(res => res.json()).then(drinks => renderDrinks(drinks)))
        } else {
          throw resp.json();
        }
      };

    
    const renderDrinks = (drinks) => {
        main.innerText = ""
        
        const logOutLi = document.createElement("li")
        const logOutA = document.createElement("a")
        logOutA.setAttribute('href', '#')
        logOutA.className = "nav-link"
        logOutA.innerText = "Log Out"
        logOutLi.append(logOutA)
        ulNav.append(logOutLi)

        logOutLi.addEventListener('click', event => {
            logOutLi.remove()
            getDrinks.classList.remove("disabled")
            loginPage()
        } )

        const stylingDiv = document.createElement("div")
        stylingDiv.className = "sticky col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2";
        const totalDiv = document.createElement("div")
        totalDiv.id = "total"
        totalDiv.className = "sticky col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2";
        const orderDiv = document.createElement("div")
        orderDiv.id = "order"
        orderDiv.className = "order"
        totalDiv.append(orderDiv, totalText);   
        drinks.forEach(drink => renderSingleDrink(drink, totalDiv));

    }

    const renderSingleDrink = (drink, totalDiv) => {
        const newDiv = document.createElement("div")
        newDiv.className = "row col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10"

        const imageDiv = document.createElement("div")
        imageDiv.className = "col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"

        const image = document.createElement("img")
        image.className = "img-responsive"
        image.height = 150
        imageDiv.append(image)
        image.src = drink.img_url

        const boxDiv = document.createElement("div")
        boxDiv.className = "row col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7"

        const titleDiv = document.createElement("div")
        titleDiv.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        const title = document.createElement("h2")
        title.innerText = drink.name
        titleDiv.append(title)


        const descriptionDiv = document.createElement("div")
        descriptionDiv.className = "col-xl-7 col-lg-7 col-md-12 col-sm-12 col-xs-12"
        const description = document.createElement("p")
        description.className = "drinks"
        description.innerText = drink.description
        descriptionDiv.append(description)

        const innerDiv = document.createElement("div")
        innerDiv.className = "row col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 text-center align-items-center"
        
        const priceDiv = document.createElement("div")
        const price = document.createElement("p")
        priceDiv.className = "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-xs-1"
        price.className = "drinks"
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
        boxDiv.append(titleDiv, descriptionDiv, innerDiv)
        newDiv.append(imageDiv, boxDiv)
        if (flip)
        {
            flip = false
            main.append(newDiv, totalDiv)
        }
        else
        {
            main.append(newDiv)
        }  

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
        const totalDiv = document.getElementById("total")
        renderSelectedItems(drink, productQuantity);
        totalDiv.append(totalText);
        const orderDiv = document.getElementById("order")
        orderDiv.append(placeOrderButton);
    }

    function renderSelectedItems(drink, productQuantity) {
        const drinkList = document.createElement("span");
        const drinkBr = document.createElement("br");
        const totalDiv = document.getElementById("total")
        drinkList.innerText = `1 * ${drink.name}`;
        totalDiv.append(drinkList, drinkBr);
    }

    const runGame = () => {
        fetch(QUIZ_URL)
        .then(res => res.json())
        .then(response => quizMaster(response.results))
    }


    async function quizMaster(results) {
        let questions = [...results]
        const score = document.createElement("h2")
        score.className
        score.innerText = "Score: "
        let scoreSpan = document.createElement("span")
        scoreSpan.innerText = 0
        score.append(scoreSpan)

        while (questions.length > 0)
        {
            main.innerText= ""
            main.append(score)
            // pull out a random question
            const question = questions.sort(() => Math.random() - 0.5).pop(); // this works
            // pull out the answer of the question
            const answer = question.correct_answer // this works
            // let the user decide between the answer and the incorrect
            const choices = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5); // this works
            
            // go to another fucntion where you render the question
            // then you return the users answer
            // 
            const userAnswer = await renderQuestion(question.question, choices) // make a function here that renders the page and returns the users answer
            
            userAnswer === answer ? scoreSpan.innerText++ : false // if true increase the points by 1 else do nothing
            // compare the users choice with the answer we pulled out at the start

        }

        
    }

    const renderQuestion = (question, choices) => {
        
        const div = document.createElement('div')
        const questionTag = document.createElement("h2")
        questionTag.innerText = question

        div.append(questionTag)
        
        choices.forEach( choice => {
            const choiceTag = document.createElement("button")
            // choiceTag.append
            choiceTag.className = "btn btn-primary"
            choiceTag.innerText = choice 
            choiceTag.value = choice 

            div.append(choiceTag)
        
        })

        main.append(div)

        return new Promise((resolve) => {
            div.addEventListener('click', (e) => {
                if (e.target.tagName === "BUTTON") resolve(e.target.value)
            })
        })
    }
})
