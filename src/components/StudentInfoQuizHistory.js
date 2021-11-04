import React, {useState} from "react";
import '../App.css';

function StudentInfoQuizHistory({quiz}) {

    let [open, setOpen] = useState(false)

    let freeResp = quiz.freeResponse.map(i => {
        if (i.noOfPeerGrades < 5) { return(
            <p>Question: {i.question}<br />
            Your answer: {i.answer}<br/>
            You can see whether this is correct or not once 5 students peer grade it. Currently only {i.noOfPeerGrades} students have graded it.
            </p>
        ) }
        let percentage = i.correctPeerGrades/i.noOfPeerGrades*100
        let correctnessSpeil
        if (percentage >= 50) { correctnessSpeil = "You were correct! Nice work!" }
        else { correctnessSpeil = "Sorry, this answer was not correct. You can always try the quiz again." }
        return (
            <p>
                Question: {i.question}<br />
                Your answer: {i.answer}<br/>
                {correctnessSpeil}<br/><br/>
            </p>
        )

    })

        function openClose() {
            setOpen(!open)
        }


        if (!open) {
            return(
                <div>
                    Quiz {quiz.id} Info <button onClick={openClose}>Open</button>
                </div>
            )
        }

        if (open) {
        return(
            <div>
                Quiz {quiz.id} Info <button onClick={openClose}>Close</button><br /><br />
                     Multiple Choice Questions Score: {quiz.mcScore}
                     {freeResp}
            </div>
        )
        }
    }



export default StudentInfoQuizHistory