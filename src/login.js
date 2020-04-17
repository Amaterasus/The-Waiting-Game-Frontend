// API
const BASE_URL = "https://twgbackend.herokuapp.com"
// const BASE_URL = "http://localhost:3000"
const USER_URL = `${BASE_URL}/users`
const ORDERS_URL = `${BASE_URL}/orders`
// const QUIZ_URL = "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple"
const QUIZ_START_URL = "https://opentdb.com/api.php?amount=20&category="
const QUIZ_EASY_END_URL = "&difficulty=easy"
const QUIZ_MEDIUM_END_URL = "&difficulty=medium"
const QUIZ_HARD_END_URL = "&difficulty=hard"
const DRINKS_URL = `${BASE_URL}/drinks`


//current user 
let current_user = false

//other stuff
let currentOrder = {
    items: [],
};
let allDrinks = [];
let currentUser = {
    name: "",
    table: ""
};

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
        renderTopics()
        
    })


    const loginPage = () => {
        main.innerText = ""
        main.className = "container-fluid"
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
        main.append(parentDiv)

        form.addEventListener("submit", event=> {
            event.preventDefault()
            const name = event.target.username.value
            const number = event.target.tablenumber.value
            currentUser.name = name
            currentUser.table = number
            createUser(name,number)
         })
    }

    const createUser = (name, number) => {
        fetch(USER_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: name,
               table_number: number
            })
        }).then(parseJSON)
       .catch(error => error.then(msg => {alert(msg.errors)}));
   };

const parseJSON = resp => {
    if (resp.ok) {
        return resp.json().then(fetch(DRINKS_URL).then(res => res.json()).then(drinks => {
            allDrinks = drinks;
            renderDrinks(drinks)
        }))
    } else {
        throw resp.json();
    }
}
