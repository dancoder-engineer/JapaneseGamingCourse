import React from "react";
import '../App.css';
import StudentInfoQuizHistory from "./StudentInfoQuizHistory.js"
import { useHistory } from "react-router-dom"

function StudentInfo({loggedIn, user}) {

    let quizList = []
    const history = useHistory()

    console.log(user.canBeGraded)

    function directToPeer() {
        history.push('/peer')
       }
    
        for (let quiz in user.quizzes){
            //console.log(user.quizzes[quiz])
            quizList.push(<StudentInfoQuizHistory quiz={user.quizzes[quiz]} />)
        }
    

    if(!loggedIn) {
        return(
            <div></div>
        )
    }

    let peerGradingButton = (
        <div>
            <button className="centeredButton" onClick={directToPeer}>Peer Grade</button>
            <p className="centeredText">Note: In order for your open ended quiz questions to be graded, you must first do a round of peer grading every time you take a quiz.</p>
        </div>
    )

    if(loggedIn) {
        return(
            <div>

                <p className="centeredText">Grade information for {user.userName}</p>
                    {quizList}
                <br />
                <br />
                <br />
                {user.canBeGraded ? null : peerGradingButton}
            </div>
        )
    }

}

export default StudentInfo