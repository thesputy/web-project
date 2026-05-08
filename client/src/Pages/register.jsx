import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
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

const handleSubmit = async e => {
  e.preventDefault()
  try {
    await axios.post("http://localhost:8800/auth/register", inputs)
    navigate("/login")
  } catch(err) {
    setErr(err.response?.data?.errors 
      ? err.response.data.errors[0].msg 
      : err.response?.data)
  }
}

  return (
    <div className='auth'>
    <h1>Regisztráció</h1>
    <form>
      <input required type="text" placeholder='Felhasználónév' name='username' onChange={handleChange}/>
      <input required type="email" placeholder='Email' name='email' onChange={handleChange}/>
      <input required type="password" placeholder='Jelszó' name='password' onChange={handleChange}/>
      <button onClick={handleSubmit}>Regisztráció</button>
      {err && <p>{err}</p>}
      <span>Rendelkezel fiókkal? <Link to="/login">Jelentkezz be!</Link>
      </span>
    </form>
    </div>
  )
}

export default Register