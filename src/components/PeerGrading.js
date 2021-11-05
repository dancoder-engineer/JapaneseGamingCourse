import React, { useEffect, useState } from "react"

function PeerGrading({url}) {

    let allUsers = {}
    let usersQuiz = 1
    let frQuestions = []

    fetch(url)
        .then(res => res.json())
        .then( data => {allUsers={...allUsers} 
        console.log(data)
        for (let user of data) {
            //console.log(user)
             for (let quiz in user.quizzes) {
                 for (let frQuestion of user.quizzes[quiz].freeResponse) {
                    if (frQuestion.noOfPeerGrades < 5) { frQuestions.push(frQuestion) }
                    console.log(frQuestions)
                 }
             }
        }
        
        })

        return(
            <div></div>
        )
}


export default PeerGrading