import React from 'react'
import { Link } from 'react-router-dom'

const login = () => {
  return (
    <div className='auth'>
    <h1>Belépés</h1>
    <form>
      <input required type="text" placeholder='Felhasználónév' />
      <input required type="password" placeholder='Jelszó' />
      <button>Belépés</button>
      <p>ez egy hiba</p>
      <span>Nem rendelkezel fiókkal? <Link to="/register">Regisztrálj!</Link>
      </span>
    </form>
    </div>
  )
}

export default login