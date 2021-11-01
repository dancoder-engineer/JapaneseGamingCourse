import React from "react"
import './styles/Lesson.css'
import MainPagePic from "./MainPagePic.js"

function GameData({pics, info}) {

    let releaseDates = info.releases.map(i => <p className="centeredText">System: {i[0]}       Date: {i[1]}</p>)
    let pictures = pics.otherPics.map(i => <MainPagePic key ={i} picData={i} />)
    return (
    <div className="gameDataPage">

        <div className="frontCover"> <img className="mainPagePic" src={pics.front} alt="pic" /> </div>
        <div className="titleScreen"> <img className="mainPagePic" src={pics.titleScreen} alt="pic" /> </div>
        <div className="backCover"> <img className="mainPagePic" src={pics.back} alt="pic" /> </div>
        <div className="releaseInfo"><h2 className="centeredText">Release Data</h2>
        {releaseDates}</div>
        
        <div className="otherPic1">{pictures[0]}</div>
        <div className="otherPic2">{pictures[1]}</div>
        
        
    </div>
    )
}


export default GameData