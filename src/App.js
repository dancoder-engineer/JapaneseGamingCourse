import './App.css';
import React, {useState} from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { lessons } from "./data/lessons.js"
import MainMenu from "./components/MainMenu.js"
import LessonHub from "./components/LessonHub.js"
import Quiz from "./components/Quiz.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"

function App() {

  //json calls
  //app, login

  const url="http://localhost:2500/users/"

  let history = useHistory();
  let loggedIn = false
  let tempo=true
  let [user, setUser] = useState({})

  if (!loggedIn) { history.push("/login")}
  

  function getUserInfo(getUser) {
    loggedIn = true
    setUser({...getUser})
    history.push("/")
    console.log(getUser)
  }

  function addUser() {

    if (tempo) {return 0}

        const user1 = {
          userName: "DanSensei",
          password: "DanSensei",
          email: "danseminara@yahoo.com",
          paidHowFar: 1,
          quizzes: [
            {
              quizId: 1,
              mcScore: 88,
              freeResponse: [
                {
                  question: "Translate to Japanese: That dress is ugly and expensive, so don't buy it!",
                  answer: "あのドレスはダサくて高いから買うなよ！",
                  noOfPeerGrades: 3,
                  correctPeerGrades: 3
                },

                {
                  question: "Translate to Japanese: The phone I'm buying tomorrow is easy to use.",
                  answer: "明日買う携帯は使いやすいです。",
                  noOfPeerGrades: 3,
                  correctPeerGrades: 3
                }
              ]  
            }
          ]
        }

       

        // fetch(url, {
        //   method: 'POST',
        //   headers: { 
        //     'Content-Type': 'application/json',
        //     accept: 'application/json' 
        //   },
        //   body: JSON.stringify(user1)
        // })

  }











  const titles = lessons.map(i => { return {
        id: i.id,
        title: i.title,
        isGame: i.isGame,
        cover: i.covers.front,
        shortDescription: i.japaneseCopy.shortDescription
      }

  })

  return (
    <div className="top">
      <p className="centeredText">Dan's Japanese Page</p>
      <button onClick={addUser}>add the user</button>
    <Switch>
      <Route exact path="/">
          <MainMenu titles = {titles} paidHowFar={user.paidHowFar*5} />
      </Route>
      <Route path="/lesson/:id">
          <LessonHub lessons = {lessons} />
      </Route>
      <Route path="/quiz/:id">
          <Quiz lessons = {lessons} />
      </Route>
      <Route path="/login">
          <Login url ={url} getUserInfo={getUserInfo} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
