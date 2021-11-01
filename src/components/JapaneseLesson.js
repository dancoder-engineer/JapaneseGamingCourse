import React from "react"
import ExtraExample from "./ExtraExample.js"
import VocabularyTable from "./VocabularyTable.js"

function JapaneseLesson({japaneseCopy}) {

    console.log(japaneseCopy)

    let howToMake = japaneseCopy.howToMake.map(i => <h3 className="centeredText" key={i}>{i}</h3>)
    let lessonCopy= japaneseCopy.mainCopy.map((i, index) => <p key={index}>{i}</p>)
    let truth = japaneseCopy.mainExample.wKanji === ""
    let kanjiLine = "W/ Kanji:" + japaneseCopy.mainExample.wKanji 
    let br = <br />

    let extraExamples = japaneseCopy.extraExamples.map(i => <ExtraExample extraExample={i} key={i.title} />)

    return(
        <div>
            <h1 className="centeredText">{japaneseCopy.lessonTitle}</h1>
            {howToMake}
            <img src={japaneseCopy.screenshot} className="lessonScreenshot" alt="screenshot" />
            <p className="smallCenteredText">
                {truth ? "" : kanjiLine}
                {truth ? "" : br}
                No Kanji: {japaneseCopy.mainExample.noKanji} <br />
                English: {japaneseCopy.mainExample.english}
            </p>
            {lessonCopy}
            <br />
            <h2 className="centeredText">Extra Examples</h2>
            {extraExamples} <br />

            <VocabularyTable vocabulary={japaneseCopy.vocabulary} />
            <br />
        </div>
    )
}

export default JapaneseLesson