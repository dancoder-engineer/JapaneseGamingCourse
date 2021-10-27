import React from "react"
import { NavLink } from "react-router-dom";
import './styles/MainMenu.css';

function MainMenuCard({titles}) {

    return (
    <div className="card">
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
    )
}

export default MainMenuCard