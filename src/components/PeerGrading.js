import React, { useEffect, useState } from "react"

function PeerGrading({url, currentUser}) {

    
    let usersQuiz
    let frQuestions = []
    let toGrade = []
    let [parts, setParts] = useState([])
    let [gradingQuestions, setGradingQuestions] = useState([])

    useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then( data => processData(data))
        }, [])



    function processData(data) {
        
            usersQuiz = Object.keys(currentUser.quizzes).length
            usersQuiz -= 1
            if (usersQuiz === 0) { usersQuiz = 1 }
            console.log(currentUser)
            for (let user of data) {
               if(!user.canBeGraded) { continue }
                 for (let quiz in user.quizzes) {
                     for (let frQuestion of user.quizzes[quiz].freeResponse) {
                        if (frQuestion.noOfPeerGrades < 5 && frQuestion.id[0] === usersQuiz && frQuestion.answer !== null) { frQuestions.push(frQuestion) }
                        frQuestions = frQuestions.filter(i => i.userName !== currentUser.userName)
                        
                     }
                 }
            }
            console.log(frQuestions)
            setGradingQuestions(frQuestions)
            toGrade = frQuestions.map((i, j) => { 
                let name = "peerGrade" + j
                //console.log(name)
                return ( 
                        <div className="peerGrading">
                            <div className="peerQuestion">
                                <p>Question: {i.question}</p>
                                <p>Student's Answer: {i.answer}</p>
                            </div>
                             <div className="peerQuestionChoice" id={j}>
                             <form className="selectionForm" >
                                <input type="radio" value="Correct" name={j} name="a" id="correct" /> Correct<br />
                                <input type="radio" value="Incorrect" name="a" id="incorrect" /> Incorrect<br />
                                <input type="radio" value="Skip" name="a" id="skip" /> Skip
                             </form>
                             </div>
                          </div>
                )})

                    setParts([...toGrade])
                
                    

            }




        function sumbitForms(e) {
                e.preventDefault()
                let eachChoice=[]
                let tempArray = []
                let choices = document.querySelectorAll(".selectionForm input")
                let arrayOfRadios = [...choices]
                let i = 0
                while (arrayOfRadios[2]) {
                    tempArray = [arrayOfRadios[0], arrayOfRadios[1], arrayOfRadios[2]]
                    if (tempArray[0].checked === true) { eachChoice.push("Correct") }
                    else if (tempArray[1].checked === true) { eachChoice.push("Incorrect") }
                    else if (tempArray[2].checked === true) { eachChoice.push("skipped") }
                    else { 
                        document.querySelector(".error").innerHTML="Please make choices for all the questions before you submit."
                        break
                    }
                    arrayOfRadios.shift()
                    arrayOfRadios.shift()
                    arrayOfRadios.shift()
                    i+=3
                }
                console.log(eachChoice)
                console.log(gradingQuestions)
            }

    
            

        return(
            <div>
                    {parts} 
                     <br />
                     <button onClick={sumbitForms} className="submitButton">Submit</button>
                     <p className="error"></p>
                <br />
                <br />
                <br />
            </div>
)

}


export default PeerGrading