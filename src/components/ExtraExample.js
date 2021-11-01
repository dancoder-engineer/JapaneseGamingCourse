import React from "react"

function ExtraExample({extraExample}){

    let truth = extraExample.wKanji === ""
    let kanjiLine = "W/ Kanji:" + extraExample.wKanji
    let br = <br />

    return (
        <div className="extraExample">
            <div className="extraTitle">
                {extraExample.title}
            </div>
            <div className="extraBox">
                <img className="extraImage" src={extraExample.box} alt={extraExample.title} />
            </div>
            <div className="extraText">
            <p className="smallLeftText">
                {truth ? "" : kanjiLine}
                {truth ? "" : br}
                No Kanji: {extraExample.noKanji} <br />
                English: {extraExample.english}
            </p>
            </div>
        </div>
    )
}

export default ExtraExample