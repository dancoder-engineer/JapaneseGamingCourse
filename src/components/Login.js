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

    // useEffect(() => {
    //     console.log(up)
    // }, [up])

    function tryToLogIn(e){
        e.preventDefault()
        fetch(url)
        .then(res => res.json())
        .then( data => {
            console.log(data)
          let getUser = data.find(i => i.userName === up.userName)
            console.log(getUser)
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

    function skipForDev() {

    setUp({
        userName: "DanSensei",
        password: "DanSensei"
      })

    }

    function newUser(){

    }
    

    return (
    <div>
        <h1 className="centeredText">Japanese through JRPGs</h1>
        <h2 className="centeredText">Login</h2>
        <p className="centeredText" id="errorMessage"></p>
        <form>
        <p className="centeredText">User Name: <input id="userName" onChange={e => handleChange(e)} /></p>
        <p className="centeredText">Password: <input id="password" type="password" onChange={e => handleChange(e)} /></p>
        
        <p className="centeredText"><button onClick={e => tryToLogIn(e)}>Login</button></p>
        </form>
        <br />
        <p className="centeredText"><button onClick={skipForDev}>UseDanSensei</button></p>
        <NavLink to="./register/"><p className="centeredText"><button onClick={newUser}>Register</button></p></NavLink>
        <br />
    </div>
    )
}

export default Login