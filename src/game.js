function renderTopics() {
    main.innerText = ""
    main.classList.remove("row")
    const div = document.createElement("div")
    const title = document.createElement("h2")
    title.innerText = "Choose a Topic"
    const buttonScience = document.createElement("button")
    const buttonMusic  = document.createElement("button")
    buttonScience.innerText = "Science: Computer"
    buttonScience.className = "btn btn-primary"
    buttonMusic.innerText = "Entertainment: Music"
    buttonMusic.className = "btn btn-primary"

    div.append(title, buttonScience, buttonMusic)
    main.append(div)
    
     
    buttonMusic.addEventListener("click", event => {
        const MUSIC_URL = `https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple`
        runGame(MUSIC_URL)
    })

    buttonScience.addEventListener("click", event => {
        const SCIENCE_URL = `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple`
        runGame(SCIENCE_URL)
    })

}
    
    const runGame = (URL) => {
        fetch(URL)
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

        let qN = 0 
        const countH2 = document.createElement("h2")
        countH2.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        

        while (questions.length > 0)
        {
            qN ++ 
            main.innerText= ""
            countH2.innerText = `Question: ${qN}/50` 
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
            main.classList.add("row")
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
