import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const write = () => {
  const [value, setValue] = React.useState('')
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' />
      <div className="editorContainer">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
      </div>

      </div>

      <div className="menu">
        <div className="item">
          <h1>Posztolás</h1>
          <span><b>Státusz: </b> Piszkozat</span>
          <span><b>Láthatóság: </b> Publikus</span>

          <input style={{display: "none"}} type="file" name="" id="file" />
        
          <label className="file" htmlFor="file">Fénykép hozzáadása</label>
          <div className="buttons">
            <button>Piszkozat mentése</button>
            <button>Posztolás</button>
          </div>
        </div>
        <div className="item">
          <h1>Kategória</h1>
          <input type="radio" name="cat" value="art" id="art" />
          <label htmlFor="art">Művészet</label>
        </div>
    </div>
    </div>
  )
}

export default write