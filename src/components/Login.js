import React, {useState, useEffect} from "react"
import './styles/MainMenu.css'
import { NavLink, Switch, useHistory } from "react-router-dom"

function Login({url, getUserInfo}) {

    
    let [up, setUp] = useState({
        userName: "",
        password: ""
    })

    function handleChange(e){
        setUp({
            ...up,
            [e.target.id]: e.target.value 
        })

    }



    function tryToLogIn(e){
        e.preventDefault()
        fetch(url)
        .then(res => res.json())
        .then( data => {
        //    console.log(data)
          let getUser = data.find(i => i.userName === up.userName)
        //    console.log(getUser)
            if (getUser === undefined) {
                document.querySelector("#errorMessage").innerHTML = "User Not Found"
                return 0
            }
            if (getUser.password !== up.password) {
                document.querySelector("#errorMessage").innerHTML = "Password Wrong"
                return 0
            }
            getUserInfo(getUser)
        })

    }


    return (
    <div>
        <h1 className="centeredText">Japanese through JRPGs</h1>
        <h2 className="centeredText">Login</h2>
        <p className="error" id="errorMessage"></p>
        <form>
        <p className="centeredText">User Name: <input id="userName" onChange={e => handleChange(e)} /></p>
        <p className="centeredText">Password: <input id="password" type="password" onChange={e => handleChange(e)} /></p>
        
        <p className="centeredText"><button onClick={e => tryToLogIn(e)}>Login</button></p>
        </form>
        <NavLink to="./register/"><p className="centeredText"><button>Register</button></p></NavLink>
        <br />
        <br />
    </div>
    )
}

export default Login