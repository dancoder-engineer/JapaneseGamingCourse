import React from "react"
import { NavLink } from "react-router-dom";
import './styles/MainMenu.css';

function MainMenuCard({titles}) {

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

    

    else { link = (
        <NavLink to={`/quiz/${titles.id / 5}/`}>Quiz No. {titles.id / 5}</NavLink>
    )}

        // <div><ruby>腐<rt>くさ</rt></ruby>った<ruby>寿司<rt>すし</rt></ruby>を<ruby>食<rt>た</rt></ruby>べるな</div>

    return (
    <div className="card">
        {link}

    </div>
    )
}

export default MainMenuCard