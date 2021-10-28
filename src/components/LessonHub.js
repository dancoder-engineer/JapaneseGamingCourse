import React from "react";
import GameData from "./GameData.js"
import GameCommentary from "./GameCommentary.js"
import JapaneseLesson from "./JapaneseLesson.js"
import './styles/Lesson.css';
import { useParams, NavLink, Switch, Route } from "react-router-dom"

function LessonHub({lessons}) {

    const params=useParams()
    

    let lesson = lessons.find(i => { return i.id === parseInt(params.id) })
    let mainLink=`/lesson/${params.id}/main`
    let gameLink=`/lesson/${params.id}/game`
    let japaneseLink=`/lesson/${params.id}/japanese`
    console.log(lesson)


    return(
        <div className="hub">
            <div className="mainInfo">
            <p className="centeredText">
                  <NavLink to={mainLink}>Front Page</NavLink>
                </p>
            </div>
            <div className="linkToGame">
            <p className="centeredText">
                  <NavLink to={gameLink}>Game Commentary</NavLink>
                </p>
            </div>
            <div className="linktoJapanese">
            <p className="centeredText">
            <NavLink to={japaneseLink}>Japanese Lesson</NavLink>
                </p>
            </div>
            <div className="linkBack">
            <p className="centeredText">
                <NavLink to="../../">Back</NavLink>
                </p>
            </div>

            <div className="theLesson">
                <Switch>
                    <Route path={mainLink}>
                        <GameData pics={lesson.covers} info={lesson.info}/>
                    </Route>
                    <Route path={gameLink}>
                          <GameCommentary gameCopy={lesson.gameCopy} screenshots={lesson.screenshots}/>
                    </Route>
                    <Route path={japaneseLink}>
                          <JapaneseLesson japaneseCopy={lesson.japaneseCopy}/>
                    </Route>

                </Switch>
            </div>
        </div>
    )
}

export default LessonHub