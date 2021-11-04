import React from "react";
import '../App.css';
import StudentInfoQuizHistory from "./StudentInfoQuizHistory.js"

function StudentInfo({loggedIn, user}) {

    let quizList = []
    
        for (let quiz in user.quizzes){
            console.log(user.quizzes[quiz])
            quizList.push(<StudentInfoQuizHistory quiz={user.quizzes[quiz]} />)
        }
    

    if(!loggedIn) {
        return(
            <div></div>
        )
    }


    if(loggedIn) {
        return(
            <div>
                <p className="centeredText">Grade information for {user.userName}</p>
                    {quizList}
                <br />
                <br />
                <br />
            </div>
        )
    }

}

export default StudentInfo