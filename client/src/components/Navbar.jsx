import React from 'react'
import Logo from "../img/GDE_Logo.png"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)  // ← ide kell!

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" style={{ width: "150px" }} />
        </div>
        <div className="links">
          <Link className='link' to="/?cat=home"><h6>Főoldal</h6></Link>
          <Link className='link' to="/?cat=forum"><h6>Fórum</h6></Link>
          <Link className='link' to="/?cat=design"><h6>Design</h6></Link>
          <Link className='link' to="/?cat=hirek"><h6>Hírek</h6></Link>
          <span>{currentUser?.username}</span>
          {currentUser 
            ? <span onClick={logout}>Kijelentkezés</span> 
            : <Link className='link' to="/login">Login</Link>
          }
          <span className="write">
            <Link className="link" to="/write">Írj</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar