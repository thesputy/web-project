import axios from 'axios'
import moment from 'moment'
import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = React.useState(state?.desc || '')
  const [title, setTitle] = React.useState(state?.title || '')
  const [file, setFile] = React.useState(null)
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const handleClick = async e => {
  e.preventDefault()
  try {
    state 
      ? await axios.put(`http://localhost:8800/posts/${state.id}`, {
          title,
          desc: value,
          uid: currentUser.id
        }, { withCredentials: true })
      : await axios.post(`http://localhost:8800/posts/`, {
          title,
          desc: value,
          img: file ? URL.createObjectURL(file) : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          uid: currentUser.id
        }, { withCredentials: true })
    navigate("/")
  } catch(err) {
    console.log(err)
  }
}

  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Posztolás</h1>
          <span><b>Státusz: </b> Piszkozat</span>
          <span><b>Láthatóság: </b> Publikus</span>
          <input style={{display: "none"}} type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file">Fénykép hozzáadása</label>
          <div className="buttons">
            <button>Piszkozat mentése</button>
            <button onClick={handleClick}>
            {state ? "Poszt frissítése" : "Posztolás"}
            </button>
          </div>
        </div>
        <div className="item">

        </div>
      </div>
    </div>
  )
}

export default Write