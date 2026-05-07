import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='auth'>
    <h1>Regisztráció</h1>
    <form>
      <input required type="text" placeholder='Felhasználónév' />
      <input required type="email" placeholder='Email' />
      <input required type="password" placeholder='Jelszó' />
      <button>Regisztráció</button>
      <p>ez egy hiba</p>
      <span>Rendelkezel fiókkal? <Link to="/login">Jelentkezz be!</Link>
      </span>
    </form>
    </div>
  )
}

export default Register