import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const handleChange = e => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  const { currentUser, login } = useContext(AuthContext)
  console.log(currentUser)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch(err) {
      setErr(err.response?.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Belépés</h1>
      <form>
        <input required type="text" placeholder='Felhasználónév' name='username' onChange={handleChange}/>
        <input required type="password" placeholder='Jelszó' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Belépés</button>
        {err && <p>{err}</p>}
        <span>Nem rendelkezel fiókkal? <Link to="/register">Regisztrálj!</Link></span>
      </form>
    </div>
  )
}

export default Login