import React, { useEffect } from "react"
import './styles/Quiz.css'

function QuizQuestion({questionData, useKanji, questionType, questionNumber, handleChange, answers}) {

    let choices

    if ( questionType === "multipleChoiceQuestions") {
        if (useKanji) { choices = questionData.choices.map(i => i[0]) }
        if (!useKanji) { choices = questionData.choices.map(i => i[1]) }

       


    }


    function restoreMultipleChoice() {
        if (answers[questionNumber-1] !== null) {
            let previouslyChosen = document.querySelectorAll(`#${answers[questionNumber-1]}`)
            
            for (let i of previouslyChosen) {
                i.className = "chosen"
            }
        }
    }



    function restoreAnswer() {
        console.log("A")
        if (answers[questionNumber-1] !== null) {
            let box = document.querySelector("#box")
            box.value=answers[questionNumber-1]
        }

    }


    useEffect(() => {
        if ( questionType === "multipleChoiceQuestions") { restoreMultipleChoice() }
        else { restoreAnswer() }


    }, [questionNumber])



    if (questionType === "multipleChoiceQuestions") {
    return(
        <div className="questionDiv">
            <h3 className="centeredText">{questionNumber}. {questionData.Question}</h3>
            <div id="A" className="unchosen" onClick={e => handleChange(e)} >
                <p id="A">Ａ。{choices[0]}</p>
            </div>

            <div id="B" className="unchosen" onClick={e => handleChange(e)} >
                <p id="B">Ｂ。{choices[1]}</p>
            </div>

            <div id="C" className="unchosen" onClick={e => handleChange(e)} >
                <p id="C">Ｃ。{choices[2]}</p>
            </div>

            <div id="D" className="unchosen" onClick={e => handleChange(e)} >
                <p id="D">Ｄ。{choices[3]}</p>
            </div>
            <br />
        </div>
    )
    }





    else {
            return(
                <div>
                    <h3 className="centeredText">{questionNumber}. {questionData}</h3>
                    <input className="inputBox" id ="box" onChange={e => handleChange(e.target.value)} />
                </div>
            )
        }
    

}

export default QuizQuestion