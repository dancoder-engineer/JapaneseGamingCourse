import React, {useState, useEffect} from "react"
import {useHistory, NavLink} from "react-router-dom"
import './styles/Quiz.css'

import './styles/MainMenu.css'

function Register({url}) {

    let history = useHistory()

    let [formData, setFormData] = useState({
        userName: "",
        password1: "",
        password2: "",
        email: "",
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value})
    }




    function registerUser(e) {
        e.preventDefault()
        
        if (formData.password1 !== formData.password2) { 
            document.querySelector("#errorMessage").innerHTML="Passwords Don't Match."
            return 0
        }

        if (formData.userName.length === 0) { 
            document.querySelector("#errorMessage").innerHTML="User Name Can't Be Empty."
            return 0
        }

        if (formData.password1.length === 0) { 
            document.querySelector("#errorMessage").innerHTML="Password Can't Be Empty."
            return 0
        }

        if (formData.email.length === 0) { 
            document.querySelector("#errorMessage").innerHTML="Email Address Can't Be Empty."
            return 0
        }

        fetch(url)
        .then(res => res.json())
        .then(data => {
            let check=data.find(i => i.userName === formData.userName)
           if (check !== undefined) { 
            document.querySelector("#errorMessage").innerHTML="User already exists. Please choose another user name."
            return 0
        }

        document.querySelector("#errorMessage").innerHTML=""

        let userData = {
            userName: formData.userName,
            password: formData.password2,
            email: formData.email,
            paidHowFar: 1,
            canBeGraded: true,
            quizzes: [
              
            ]
          }



          
        fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            accept: 'application/json' 
          },
          body: JSON.stringify(userData)
        })
        .then(history.push("/login/"))






        })

      
        

        

        


    }

    // 


    return(
        <div>
            <h1 className="centeredText">Registration Page</h1>
            <p className="error" id="errorMessage"></p>
            <form>
                <p className="centeredText">User Name: <input id="userName" onChange={e => handleChange(e)} /></p>
                <p className="centeredText">Email Address: <input id="email" onChange={e => handleChange(e)} /></p>
                <p className="centeredText">Password: <input id="password1" type="password" onChange={e => handleChange(e)} /></p>
                <p className="centeredText">Password: <input id="password2" type="password" onChange={e => handleChange(e)} /></p>
                <NavLink to="/login"><p className="centeredText"><button>Back</button></p></NavLink>
                <p className="centeredText"><button onClick={e => registerUser(e)}>Register</button></p>
                <br />
            </form>
        </div>
    )
}

export default Register