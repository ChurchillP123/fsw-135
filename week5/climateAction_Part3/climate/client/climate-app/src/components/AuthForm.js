import {React, useContext} from 'react'
import { UserContext } from '../context/UserProvider.js'

const AuthForm = (props) => {
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    inputs: {
      username, 
      password
    } 
  } = props

  const context = useContext(UserContext);

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
      <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center"}}>{ context.userState.errMsg } </p>
    </form>
  )
}

export default AuthForm;