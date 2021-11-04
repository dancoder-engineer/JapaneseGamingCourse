import React, { useEffect, useState } from "react"
import './styles/Quiz.css'
import { useParams, NavLink } from "react-router-dom"
import QuizQuestion from "./QuizQuestion.js"

function Quiz({lessons, userName, url, userId, user, updateUserInfo}) {

    let userUrl = url+userId
    console.log(userUrl)
    
    const params = useParams()
    let quizData = lessons.find(i => { return i.id === parseInt(params.id) * 5 }).quizData
    let noOfQuestions = quizData.multipleChoiceQuestions.length + quizData.openEndedQuestions.length

    let [questionNumber, setQuestionNumber] = useState(1)
    let [useKanji, setUseKanji] = useState(true)
    let [questionType, setQuestionType] = useState("multipleChoiceQuestions")
    let [questionData, setQuestionData] = useState(quizData.multipleChoiceQuestions[0])
    let [answers, setAnswers] = useState([])

    let mcAnswers = quizData.multipleChoiceQuestions.map(i => i.correctChoice)

    console.log(quizData.openEndedQuestions)

    useEffect( () => {
        let tempAns=[]
        for(let i=0; i < noOfQuestions; i++) { tempAns.push(null) }
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





    function gradeQuiz() {
        let right=0
        let ques="question"
        for (let i=0; i < quizData.multipleChoiceQuestions.length; i++) {
            if (mcAnswers[i] === answers[i]) { right += 1 }
        }
        if (right > 1) { ques += "s" }
        if (right === 0) { ques += "s" }
        let gradeSpiel = `You got ${right} ${ques} right out of ${quizData.multipleChoiceQuestions.length}. That's ${right/quizData.multipleChoiceQuestions.length*100}%`
        document.querySelector("#grade").innerHTML=gradeSpiel

        let freeResp = quizData.openEndedQuestions.map( (i, qno) => { return (
           {
                userName: userName,
                id: [quizData.quizNo, qno+1],
                question: i,
                answer: answers[quizData.multipleChoiceQuestions.length+qno],
                noOfPeerGrades: 0,
                correctPeerGrades: 0
           }
        )
        })




        let quizzes = {...user.quizzes}


        quizzes["quiz"+params.id] = {
            
                
                
                id: quizData.quizNo,
                mcScore: Math.floor(right/quizData.multipleChoiceQuestions.length*100),
                freeResponse: freeResp
                }
            
          

          let fullquizzes = {...user, quizzes}
          
       console.log(user)
        
       fetch(userUrl, {
           method: 'PATCH',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(fullquizzes)
       })
       .then(res => res.json())
       .then(data => {
        updateUserInfo(data)
       })

    }
    // <p className="centeredText">Question {questionNumber} of {noOfQuestions}</p>

    return (
        <div className="quizPage">
            <div className="questionNumber">
                <br />
                {useKanji ? <button onClick={changeKanji}>Get rid of the Kanji</button> : <button onClick={changeKanji}>Show me the Kanji</button>}
            </div>

            

            <div className="kanjiKanaButton">
                <br />
                <NavLink to="../../">
                    <button>Return to Main Menu</button>
                </NavLink>
            </div>


            <div className="quizQuestion">
                <QuizQuestion questionData={questionData} useKanji={useKanji} questionType={questionType} questionNumber={questionNumber} handleChange={handleChange} answers={answers} />
            </div>

            <div className="backButton"><br /><button onClick={goBack}>Previous Question</button></div>
            <div className="submitButton"><br /><button className="inputBox"  onClick={gradeQuiz}>Let's Get this Baby Graded!</button></div>
            <div className="nextButton"><br /><button onClick={goForward}>Next Question</button></div>





            <div className="middleForDev">
                <p className="centeredText" id="grade"></p>
            </div>

        </div>
    )
}

export default Quiz