import React from "react"
import './styles/Lesson.css'

function MainPagePic({picData}) {
return (
    <div className="picCard">
        <img className="mainPageImgInDiv" src={picData.pic} alt="pic" />
        <p className="smallLeftText">{picData.caption}</p>
    </div>
)
}

export default MainPagePic