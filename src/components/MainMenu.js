import React from "react"
import MainMenuCard from './MainMenuCard.js'
import './styles/MainMenu.css';


function MainMenu({ titles, paidHowFar, user }) {
let canSeeTitles = titles.filter( i => i.id <= paidHowFar)
let temp = canSeeTitles.map(i => <MainMenuCard key={i.id} titles={i} user={user} /> )



return (
   <div className="cards">
       {temp}
   </div>
)

}

export default MainMenu