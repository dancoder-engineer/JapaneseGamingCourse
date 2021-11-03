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
  //app, login, register

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








function massacre() {
 // fetch("http://localhost:2500/users/4", {method: 'DELETE'})
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
      <p className="centeredText" onClick={massacre}>Dan's Japanese Page</p>
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
        <Register url={url} />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
