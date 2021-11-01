import React from "react"

function VocabularyTable({vocabulary}){

    


   

     let rows = vocabulary.map(i => { return (
     <tr  key={i[0]}>
                <td>{i[0]}</td>
                <td>{i[1]}</td>
                <td>{i[2]}</td>
    </tr>)
    }
    )


    return (
        <div>
            <table className="vocTable" border = "1" >
            <thead>
                <tr>
                    <th>With Kanji</th>
                    <th>W/O Kanji</th>
                    <th>English</th>
                </tr>
            </thead>
                <tbody>
                   {rows}
                </tbody>
            </table>
        </div>
    )
}

export default VocabularyTable