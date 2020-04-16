// API
const BASE_URL = "https://twgbackend.herokuapp.com"
const USER_URL = `${BASE_URL}/users`
const QUIZ_URL = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
const DRINKS_URL = `${BASE_URL}/drinks`

//current user 
let current_user = false

//other stuff
let currentOrder = {
    items: [],
};
let allDrinks = [];
let currentUser = {
    name: [],
    table: []
};

// Dom stuff
const main = document.getElementById("main");

const totalText = document.createElement("h6");
totalText.innerText = `ORDER TOTAL: £0.00`;

// const orderNowDiv = document.getElementById("order");
// orderNowDiv.className = "order";

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

    if (!current_user === true ){
        loginPage()
        getDrinks.classList.add("disabled")
    }
    else {
        fetch(DRINKS_URL).then(res => res.json()).then(drinks => {
            allDrinks = drinks;
          renderDrinks(drinks)
        })
    }
    
  })

    game.addEventListener("click", e => {
        e.preventDefault()
        getDrinks.classList.remove("disabled")
        getDrinks.classList.remove("active")
        game.classList.add("active")
        getDrinks.classList.remove("disabled")
        runGame()
        
    })
    
    const loginPage = () => {
        main.innerText = ""
        main.className = "container-fluid"
        // const anchorDiv = document.createElement("div")
        //  anchorDiv.className = "container h-100"
        const parentDiv = document.createElement("div")
        parentDiv.className = "offset-lg-3 col-lg-6 row h-100 text-center justify-content-center align-items-center parent"
        const childDiv = document.createElement("div")
        childDiv.className = " col-4 colour"
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
        // anchorDiv.append(parentDiv)
        main.append(parentDiv)

        form.addEventListener("submit", event=> {
            event.preventDefault()
            const name = event.target.username.value
            // current_user = event.target.username.value
            const number = event.target.tablenumber.value
            currentUser.name.push(name)
            currentUser.table.push(number)
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
    };

    const parseJSON = resp => {
        console.log("this is the response from the server", resp);
        if (resp.ok) {
            return resp.json().then(fetch(DRINKS_URL).then(res => res.json()).then(drinks => {
                allDrinks = drinks;
              renderDrinks(drinks)
            }))
        } else {
          throw resp.json();
        }
      };

    
    const renderDrinks = (drinks) => {
        main.innerText = ""
        main.className = "row container-fluid"
        if (current_user === false ) {
        const logOutLi = document.createElement("li")
        const logOutA = document.createElement("a")
        logOutA.setAttribute('href', '#')
        logOutA.className = "nav-link"
        logOutA.innerText = "Log Out"
        logOutLi.append(logOutA)
        ulNav.append(logOutLi)
        current_user = true 
        flip = true 
    
        logOutLi.addEventListener('click', event => {
            logOutLi.remove()
            current_user = false
            getDrinks.classList.remove("disabled")
            loginPage()
            getDrinks.classList.add("disabled")
        } )
     }

        const stylingDiv = document.createElement("div")
        stylingDiv.className = "sticky col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2";
        const totalDiv = document.createElement("div")
        totalDiv.id = "total"
        totalDiv.className = "sticky col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2";
        const orderDiv = document.createElement("div")
        orderDiv.id = "order"
        orderDiv.className = "row text-center order"
        totalDiv.append(orderDiv, totalText, placeOrderButton);   
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
        addDrinkButton.className = "btn btn-primary";
        addDrinkDiv.append(addDrinkButton);
        addDrinkButton.innerText = "Add to Cart";

        addDrinkButton.addEventListener("click", (e) => {
            addToOrder(drink);
        })

        innerDiv.append(priceDiv, addDrinkDiv)
        boxDiv.append(titleDiv, descriptionDiv, innerDiv)
        newDiv.append(imageDiv, boxDiv)
        if (flip)
        {
            flip = false
            main.append(newDiv, totalDiv)
        } else {
            main.append(newDiv)
        }  
    }

    function addToOrder(drink) {
        let orderItem = currentOrder.items.find(item => item.drinkId === drink.id);
        if(orderItem === undefined) {
            const newItem = { 
                name: drink.name,
                drinkId: drink.id,
                quantity: 1 
            };
            currentOrder.items.push(newItem);
        } else {
            for( var i in currentOrder.items ) {
                if(currentOrder.items[i].drinkId === drink.id) {
                    currentOrder.items[i].quantity += 1
                };
            };
        }
        renderShoppingCart();
        // renderSelectedItem(drink)
    };

    function renderShoppingCart() {
        const orderDiv = document.getElementById("order")
        orderDiv.innerText = ""
        currentOrder.items.forEach(item => renderSelectedItem(item))
    }

    function renderSelectedItem(drink) {
        console.log("before drink")
        console.log(drink.drinkId)
        const orderDiv = document.getElementById("order");
        const drinkList = document.createElement("span");
        const itemDiv = document.createElement("div")
        itemDiv.className = "row text-center"
        const drinkListDiv = document.createElement("div")
        drinkListDiv.className = "col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8"
        drinkListDiv.append(drinkList)
        const removeButton = document.createElement("button");
        const removeButtonDiv = document.createElement("div")
        removeButtonDiv.className = "col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"
        removeButtonDiv.append(removeButton)

        removeButton.className = "btn btn-outline-danger btn-xs py-0";
        removeButton.value = drink.drinkId
        removeButton.innerText = "x";
        removeButton.drinkId = drink.id;

        removeButton.addEventListener('click', (e) => {
            console.log("inside removebutton event listener")
            console.log(e.target.value)
            currentOrder.items = currentOrder.items.filter(item => item.drinkId !== parseInt(e.target.value))
            e.target.parentElement.parentElement.remove();
            console.log("before currentOrder.items in removeButton event listener")
            console.log(currentOrder.items)
            renderTotal();
        })

        drinkList.innerText = `${drink.name} x ${drink.quantity}  `;
        // drinkList.append(removeButton);
        itemDiv.append(drinkListDiv, removeButtonDiv);
        orderDiv.append(itemDiv)
        renderTotal();
    }

    function renderTotal() {
        console.log("before currentOrder.items in renderTotal")
        console.log(currentOrder.items)
        totalText.innerText = `ORDER TOTAL: £${calculateTotal(currentOrder.items)}`
        
    }

    function calculateTotal(items) {
        let total = 0;
        console.log(items)
        items.forEach((item) => {
            console.log(item)
          const drink = allDrinks.find(d => d.id === item.drinkId);
          console.log(drink)
          total += drink.price * item.quantity;
          console.log(total)
        });
        return total.toFixed(2);
    };
 
    placeOrderButton.addEventListener("click", () => {
        currentOrder.items.length === 0 ? alert("Your basket is empty... How drunk are you??") : postOrder()
    });
    
    function postOrder() {

        console.log("I'm here")
        console.log(currentUser)
    }

    const runGame = () => {
        fetch(QUIZ_URL)
        .then(res => res.json())
        .then(response => quizMaster(response.results))
        flip = true 
    }


    async function quizMaster(results) {
        let questions = [...results]
        const score = document.createElement("h2")
        score.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"
        score.innerText = "Score: "
        let scoreSpan = document.createElement("span")
        scoreSpan.innerText = 0
        score.append(scoreSpan)
       

        while (questions.length > 0)
        {
            qN++ 
            main.innerText= ""
            main.append(score,countH2)
            // pull out a random question
            const question = questions.sort(() => Math.random() - 0.5).pop(); // this works
            // pull out the answer of the question
            const answer = question.correct_answer // this works
            // let the user decide between the answer and the incorrect
            const choices = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5); // this works
            
            // go to another fucntion where you render the question
            // then you return the users answer
            
            const userAnswer = await renderQuestion(question.question, choices) // make a function here that renders the page and returns the users answer
            
            main.innerText= ""
            main.append(score,countH2)

            userAnswer === answer ? scoreSpan.innerText++ : false

            const con = await renderAnswers(question.question, choices, answer)

             // if true increase the points by 1 else do nothing
            // compare the users choice with the answer we pulled out at the start

        }

        
    }

    const renderQuestion = (question, choices) => {
        
        const div = document.createElement('div')
        div.className = "offset-xl-2 offset-lg-2 offset-md-2 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center"
        const questionTag = document.createElement("h2")
        questionTag.innerHTML = question

        div.append(questionTag)
        
        choices.forEach( choice => {
            const choiceTag = document.createElement("button")
            // choiceTag.append
            choiceTag.className = "btn btn-primary"
            choiceTag.innerHTML = choice 
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

    const renderAnswers = (question, choices, answer) => {
        
        const div = document.createElement('div')
        div.className = "offset-xl-2 offset-lg-2 offset-md-2 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 text-center"
        const questionTag = document.createElement("h2")
        questionTag.innerHTML = question

        div.append(questionTag)
        console.log(answer)

        choices.forEach( choice => {
            console.log(choice)
            const choiceTag = document.createElement("button")
            // choiceTag.append
            if (choice === answer)
            {
                choiceTag.className = "btn btn-success"
            }
            else
            {
                choiceTag.className = "btn btn-danger"
            }
            
            choiceTag.innerHTML = choice 
            choiceTag.value = choice 

            div.append(choiceTag)
        
        })

        main.append(div)

        return new Promise((resolve) => {
            div.addEventListener('click', (e) => {
                resolve(e.target.value)
            })
        })
    }
})
