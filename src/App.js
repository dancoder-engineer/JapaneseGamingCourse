import './App.css';
import React from "react"
import { Route, Switch } from "react-router-dom"
import { lessons } from "./data/lessons.js"
import MainMenu from "./components/MainMenu.js"
import LessonHub from "./components/LessonHub.js"

function App() {
  console.log(lessons)
  
  const titles = lessons.map(i => { return {
        id: i.id,
        title: i.title,
        cover: i.covers.front,
        shortDescription: i.japaneseCopy.shortDescription
      }

  })

  return (
    <div>
      <p className="test">Dan's Japanese Page</p>
    <Switch>
      <Route exact path="/">
          <MainMenu titles = {titles} />
      </Route>
      <Route path="/lesson/:id">
          <LessonHub lessons = {lessons} />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
