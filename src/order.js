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
