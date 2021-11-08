import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function PeerGrading({url, currentUser}) {

    

    const history = useHistory()

    console.log(currentUser, url)
    let usersQuiz
    let frQuestions = []
    let toGrade = []
    let [parts, setParts] = useState([])
    let [gradingQuestions, setGradingQuestions] = useState([])
    let [allUsers, SetAllUsers] = useState([])

    useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then( data => processData(data))
        }, [])



    function processData(data) {
            SetAllUsers(data)
            let useTheseQuestions = []
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
            for (let i = 0; i < 7; i++){
                let rando = (Math.floor(Math.random() * frQuestions.length))
                if (useTheseQuestions.includes(frQuestions[rando]) || (frQuestions. noOfPeerGrades >= 5)) {
                    i-=1
                    continue
                 }
                 useTheseQuestions.push(frQuestions[rando])
            }

            console.log(useTheseQuestions)
            setGradingQuestions(useTheseQuestions)
            toGrade = useTheseQuestions.map((i, j) => { 
                //let name = "peerGrade" + j
                //console.log(name)
                return ( 
                        <div className="peerGrading">
                            <div className="peerQuestion">
                                <p>Question: {i.question}</p>
                                <p>Student's Answer: {i.answer}</p>
                            </div>
                             <div className="peerQuestionChoice" id={j}>
                             <form className="selectionForm" >
                                <input type="radio" value="Correct" name="a" name="a" id="correct" /> Correct<br />
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
                let choices = document.querySelectorAll(".selectionForm input")
                let arrayOfRadios = [...choices]
                let i = 0
                while (arrayOfRadios[2]) {
                    if (arrayOfRadios[0].checked === true) { eachChoice.push("Correct") }
                    else if (arrayOfRadios[1].checked === true) { eachChoice.push("Incorrect") }
                    else if (arrayOfRadios[2].checked === true) { eachChoice.push("skipped") }
                    else { eachChoice.push("skipped") }
                    arrayOfRadios.shift()
                    arrayOfRadios.shift()
                    arrayOfRadios.shift()
                    i+=3
                }
                console.log(eachChoice)
                console.log(gradingQuestions)

                for (let i = 0; i < gradingQuestions.length; i++) { update(eachChoice, i) }

                currentUser.canBeGraded = true
                let currentUrl = url + currentUser.id
                fetch (currentUrl, {
                    method: 'PATCH',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(currentUser)
                })
                .then ( history.push("../"))
            }

    
            function update(eachChoice, i) {
                
                let questionBeingGraded = gradingQuestions[i]
                let questionUser = allUsers.find(i => i.userName === questionBeingGraded.userName )
                let currentUrl = url + questionUser.id
                let whichQuiz = 'quiz' + questionBeingGraded.id[0]



                //let eachChoice=["Correct", 2] //
                console.log(allUsers)

                
                if (eachChoice[i] !== "skipped") {questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] += 1}
                if (questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] > 5) { questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] = 5 }
                else {
                    if (eachChoice[i] === "Correct") { questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["correctPeerGrades"] += 1 }
                }
                console.log(questionUser)

                fetch (currentUrl, {
                    method: 'PATCH',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(questionUser)
                })
            }

        return(
            <div>
                    {parts} 
                     <br />
                     <button onClick={sumbitForms} className="submitButton">Submit</button>
                     <button onClick={update} className="submitButton">Update</button>
                     <p className="error"></p>
                <br />
                <br />
                <br />
            </div>
)

}


export default PeerGrading