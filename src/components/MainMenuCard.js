import React from "react"
import { NavLink } from "react-router-dom";
import './styles/MainMenu.css';

function MainMenuCard({titles, user}) {

    let link

    if(titles.isGame) { link = (
        <div>
        <div className="picDiv">
        <NavLink to={`/lesson/${titles.id}/main`}>
             <img src={titles.cover} className="coverPic" alt="pic" />
        </NavLink>
        </div>
        <p className="centeredText">
        <NavLink to={`/lesson/${titles.id}/main`}>Game: {titles.title}<br />
        Japanese: {titles.shortDescription}</NavLink>
        </p>
        </div>
    )}

    

    else { 
       
        
        
        if (Object.keys(user.quizzes).length >= (titles.id / 5)) { 
            let quizId = "quiz" + titles.id / 5
            let noOfFreeResponse = user["quizzes"][quizId]["freeResponse"].length
            let rightFreeResponses = 0
            
            for (let i in user["quizzes"][quizId]["freeResponse"]) {
                let percentage = 0
                if (i.noOfPeerGrades !== 0){
                     percentage = i.correctPeerGrades/i.noOfPeerGrades * 50
                }
                if (percentage >= 50) { rightFreeResponses += 1 }
            }

            console.log(noOfFreeResponse)
            link = (
            <div className="quizData">
                <br /><br />
                <p>Quiz taken.<br />
                Multiple choice grade: {user["quizzes"][quizId]["mcScore"]}<br />
                Free response questions: {rightFreeResponses}/{noOfFreeResponse} right.<br />
                   See below for details.</p>
                <NavLink to={`/quiz/${titles.id / 5}/`}>Quiz No. {titles.id / 5}</NavLink>
                <p>Warning: Retaking the quiz will erase all current records upon grading.</p>
            </div>
            )
        }


        else { 
            link = (
            <div className="quizData">
                <br /><br /><br /><br /><br />
                <p>Quiz not yet taken. Give it a shot!</p>
                <NavLink to={`/quiz/${titles.id / 5}/`}>Quiz No. {titles.id / 5}</NavLink>
            </div>
            )
        }
        
        
    }

        // <div><ruby>腐<rt>くさ</rt></ruby>った<ruby>寿司<rt>すし</rt></ruby>を<ruby>食<rt>た</rt></ruby>べるな</div>

    return (
    <div className="card">
        {link}

    </div>
    )
}

export default MainMenuCard