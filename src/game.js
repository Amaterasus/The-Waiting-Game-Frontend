function renderTopics() {

    const games = [
                {
                    number: 9,
                    quiz: "General Knowledge"
                },
                {
                    number: 31,
                    quiz: "Japanese Anime & Manga"
                },
                {
                    number: 12,
                    quiz: "Entertainment: Music"
                },
                {
                    number: 18,
                    quiz: "Science: Computer"
                }
            ]
    main.innerText = ""
    main.classList.remove("row")
    const div = document.createElement("div")
    const title = document.createElement("h2")
    title.innerText = "Choose a Topic"

    div.append(title)

    games.forEach(game => {
        const gameButton = document.createElement("button")
        gameButton.className = "btn btn-primary"
        gameButton.innerText = game.quiz

        gameButton.addEventListener("click", () => runGame(`${QUIZ_START_URL}${game.number}${QUIZ_END_URL}`))

        div.append(gameButton)
    })
    main.append(div)
    

}
    
    const runGame = (URL) => {
        fetch(URL)
        .then(res => res.json())
        .then(response => quizMaster(response.results))
        flip = true 
    }

async function quizMaster(results) {
    main.classList.add("row")
    let questions = [...results]
    const score = document.createElement("h2")
    score.className = "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right"
    score.innerText = "Score: "
    let scoreSpan = document.createElement("span")
    scoreSpan.innerText = 0
    score.append(scoreSpan)
    let qN = 0 
    const countH2 = document.createElement("h2")
    countH2.className = "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"
    
    while (questions.length > 0)
    {
        qN ++ 
        main.innerText= ""
        countH2.innerText = `Question: ${qN}/20` 
        main.append(countH2, score)
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
        main.append(countH2, score)

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
        choiceTag.className = "btn btn-primary question"
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
        const nextButton = document.createElement("button") 
        nextButton.className = "btn btn-primary"
        const br = document.createElement("p")
        nextButton.innerText = "NEXT"

        div.append(questionTag)
        console.log(answer)

        choices.forEach( choice => {
            console.log(choice)
            const choiceTag = document.createElement("button")
            // choiceTag.append
            if (choice === answer)
            {
                choiceTag.className = "btn btn-success question"
            }
            else
            {
                choiceTag.className = "btn btn-danger question"
            }
            
            choiceTag.innerHTML = choice 
            choiceTag.value = choice 

            div.append(choiceTag)
        
        })
        div.append(br,nextButton)
        main.append(div)

        return new Promise((resolve) => {
            div.addEventListener('click', (e) => {
                if (e.target.innerText === "NEXT") resolve(e.target.value)
            })
        })
    }


