import React from "react";

function Screenshot({screenshot}) {

    return (
        <div className="screen">
            <img className="sideImg" src={screenshot.url} alt="screen" />
            <p>{screenshot.caption}</p>
        </div>
    )
}

export default Screenshot