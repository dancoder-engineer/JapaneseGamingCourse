import './App.css';
import React from "react"
import { Route, Switch } from "react-router-dom"
import { lessons } from "./data/lessons.js"
import MainMenu from "./components/MainMenu.js"
import LessonHub from "./components/LessonHub.js"
import Quiz from "./components/Quiz.js"

function App() {
  console.log(lessons)
  
  const titles = lessons.map(i => { return {
        id: i.id,
        title: i.title,
        isGame: i.isGame,
        cover: i.covers.front,
        shortDescription: i.japaneseCopy.shortDescription
      }

  })

  return (
    <div>
      <p className="centeredText">Dan's Japanese Page</p>
    <Switch>
      <Route exact path="/">
          <MainMenu titles = {titles} />
      </Route>
      <Route path="/lesson/:id">
          <LessonHub lessons = {lessons} />
      </Route>
      <Route path="/quiz/:id">
          <Quiz lessons = {lessons} />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
