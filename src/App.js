import './App.css';
import React, {useState} from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { lessons } from "./data/lessons.js"
import MainMenu from "./components/MainMenu.js"
import LessonHub from "./components/LessonHub.js"
import Quiz from "./components/Quiz.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import StudentInfo from "./components/StudentInfo.js"
import PeerGrading from "./components/PeerGrading.js"

function App() {

  //json calls
  //app, login, register

  const url="http://localhost:2500/users/"

  let history = useHistory();
  let [loggedIn, setLoggedIn] = useState(false)
  let [user, setUser] = useState({quizzes: []})

  if (!loggedIn) { history.push("/login")}
  

  function getUserInfo(getUser) {
    setLoggedIn(true)
    setUser({...getUser})
    history.push("/")
    console.log(getUser)
  }




function updateUserInfo(updatedUser) {
  setUser({...updatedUser})
}



function massacre() {
 // console.log(user)
 //fetch("http://localhost:2500/users/4", {method: 'DELETE'})
 history.push('/peer')
}

function directToPeer() {
  history.push('/peer')
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
          <MainMenu titles = {titles} paidHowFar={user.paidHowFar*5} user={user} />
      </Route>
      <Route path="/lesson/:id">
          <LessonHub lessons = {lessons} />
      </Route>
      <Route path="/quiz/:id">
          <Quiz lessons={lessons} userName={user.userName} url={url} userId={user.id} user={user} updateUserInfo={updateUserInfo} />
      </Route>
      <Route path="/login">
          <Login url ={url} getUserInfo={getUserInfo} />
      </Route>
      <Route path="/register">
        <Register url={url} />
      </Route>

      <Route path="/peer">
        <PeerGrading url={url} currentUser={user}/>
      </Route>
    </Switch>
    
    <Switch>
    <Route exact path="/">
      <StudentInfo loggedIn={loggedIn} user={user}/>
    </Route>
    </Switch>


    </div>
  );
}

export default App;
