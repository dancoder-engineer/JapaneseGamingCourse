import React, { useEffect, useState } from "react"
import './styles/Quiz.css'
import { useParams, NavLink } from "react-router-dom"
import QuizQuestion from "./QuizQuestion.js"

function Quiz({lessons}) {

    
    
    const params = useParams()
    let quizData = lessons.find(i => { return i.id === parseInt(params.id) * 5 }).quizData
    let noOfQuestions = quizData.multipleChoiceQuestions.length + quizData.openEndedQuestions.length

    let [questionNumber, setQuestionNumber] = useState(1)
    let [useKanji, setUseKanji] = useState(true)
    let [questionType, setQuestionType] = useState("multipleChoiceQuestions")
    let [questionData, setQuestionData] = useState(quizData.multipleChoiceQuestions[0])
    let [answers, setAnswers] = useState([])

    useEffect( () => {
        let tempAns=[]
        for(let i=0; i <noOfQuestions; i++) { tempAns.push(null) }
        setAnswers([...tempAns])
    }, [])

   
    function handleChange(answer) {

        let tempAnswer=[...answers]
        

        if ( questionType === "multipleChoiceQuestions") {
            let oldChoice = document.querySelectorAll(".chosen")
            
            if (oldChoice.length !== 0) {
                for (let i of oldChoice) {
                    i.className = "unchosen"
                }
            }
            answer.target.className="chosen"
            tempAnswer[questionNumber-1] = answer.target.id
         }

        else { 
            tempAnswer[questionNumber-1] = answer
        }

        console.log(tempAnswer)
        setAnswers([...tempAnswer])
    }

    function changeKanji(){
        setUseKanji(!useKanji)
    }

    function goBack(){
        if (questionNumber !== 1) { setQuestionNumber(questionNumber - 1) }
        clearAnswers()
    }

    function goForward(){
        if (questionNumber !== noOfQuestions) { setQuestionNumber(questionNumber + 1) }
        clearAnswers()
    }

    function clearAnswers() {
        console.log(answers)

        if ( questionType === "multipleChoiceQuestions") {
            let oldChoice = document.querySelectorAll(".chosen")
            
            if (oldChoice.length !== 0) {
                for (let i of oldChoice) {
                    i.className = "unchosen"
                }
            }
        


         }

         else {
            let answerBox = document.querySelector("#box")
            answerBox.value=""
         }
    }

    useEffect(() => {
        
        if (questionNumber > (quizData.multipleChoiceQuestions.length)) { 
            setQuestionType("openEndedQuestions") 
            let quesNo = questionNumber - quizData.multipleChoiceQuestions.length
            setQuestionData(quizData.openEndedQuestions[quesNo-1])
        }
        else { 
            setQuestionType("multipleChoiceQuestions")
            setQuestionData(quizData.multipleChoiceQuestions[questionNumber-1])
         }
    }, [questionNumber])

    function showData() {
        console.log(questionData)
    }


    return (
        <div className="quizPage">
            <div className="questionNumber">
                <p className="centeredText">Question {questionNumber} of {noOfQuestions}</p>
            </div>

            <div className="kanjiKanaButton">
                {useKanji ? <button onClick={changeKanji}>Get rid of the Kanji</button> : <button onClick={changeKanji}>Show me the Kanji</button>}
                <br />
                <br />
                <NavLink to="../../">
                    <button>Return to Main Menu</button>
                </NavLink>
            </div>


            <div className="quizQuestion">
                <QuizQuestion questionData={questionData} useKanji={useKanji} questionType={questionType} questionNumber={questionNumber} handleChange={handleChange} answers={answers} />
            </div>




            <div className="backButton"><br /><button onClick={goBack}>Previous Question</button></div>
            <div className="submitButton"><br /><button className="inputBox">Let's Get this Baby Graded!</button></div>
            <div className="nextButton"><br /><button onClick={goForward}>Next Question</button></div>

        </div>
    )
}

export default Quiz