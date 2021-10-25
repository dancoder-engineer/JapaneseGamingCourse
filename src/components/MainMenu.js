import React from "react"
import MainMenuCard from './MainMenuCard.js'
import './styles/MainMenu.css';


function MainMenu({ titles }) {

console.log(titles)
//let temp = titles.map(i => <p key={i.id}>{i.id}. {i.title}</p>)
let temp = titles.map(i => <MainMenuCard key={i.id} titles={i} /> )


return (
   <div className="cards">
       {temp}
   </div>
)

}

export default MainMenu