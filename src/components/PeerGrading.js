import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

function PeerGrading({url, currentUser}) {

    

    const history = useHistory()

    console.log(currentUser, url)
    let usersQuiz
    let frQuestions = []
    let useTheseQuestions = []
    let allUsers
    let [data, setData] = useState(null)

    useEffect(() => {
    fetch(url)
        .then(res => res.json())
        .then(dat => setData(dat))
        }, [])


        function gatherQuestions() {
            allUsers = data
            usersQuiz = Object.keys(currentUser.quizzes).length
            usersQuiz -= 1
            if (usersQuiz === 0) { usersQuiz = 1 }
            
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

            return useTheseQuestions
        }



        
    function processData() {
 
            
            return gatherQuestions().map((i, j) => { 
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

                    
                
                    

            }




        function sumbitForms(e) {
                e.preventDefault()
                let eachChoice=[]
                const choices = document.querySelectorAll(".selectionForm input")
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
                

                for (let i = 0; i < useTheseQuestions.length; i++) { update(eachChoice, i) }

                currentUser.canBeGraded = true
                let currentUrl = url + currentUser.id

                patch(currentUrl, currentUser, true)
            }

    
            function update(eachChoice, i) {
                
                const questionBeingGraded = useTheseQuestions[i]
                const questionUser = allUsers.find(i => i.userName === questionBeingGraded.userName )
                const currentUrl = url + questionUser.id
                const whichQuiz = 'quiz' + questionBeingGraded.id[0]
                
                if (eachChoice[i] !== "skipped") {questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] += 1}
                if (questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] > 5) { questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["noOfPeerGrades"] = 5 }
                else {
                    if (eachChoice[i] === "Correct") { questionUser["quizzes"][whichQuiz]["freeResponse"][questionBeingGraded.id[1]-1]["correctPeerGrades"] += 1 }
                }

                patch(currentUrl, questionUser)
            }






            function patch(url, whatToPut, send=false) {
                fetch (url, {
                    method: 'PATCH',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(whatToPut)
                })
                .then(() => {
                    if (send) { history.push("../")}
            })
        }





        return(
            <div>
                    {data && processData()}
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