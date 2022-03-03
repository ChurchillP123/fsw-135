import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'
import { useNavigate } from 'react-router-dom';

const initInputs = { username: "", password: "" }

export default function Login(){
  const [inputs, setInputs] = useState(initInputs)
  let navigate = useNavigate();

  const  {login}  = useContext(UserContext)
console.log(login)
  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

 

  function navigationSignup(){
    //resetAuthErr()
    navigate("/signup");
  }
 

  return (
    <div className="auth-container">
      <h1>Todo App</h1>
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
          />
          <p onClick={navigationSignup}>Not a member?</p>
        </>
    </div>
  )
}