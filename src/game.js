
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
            
            const userAnswer = await renderQuestion(question.question, choices) // make a function here that renders the page and returns the users answer
            
            main.innerText= ""
            main.append(score)

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
