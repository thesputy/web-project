import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'

const Home = () => {

const [posts, setPosts] = useState([])
const { currentUser } = useContext(AuthContext)
const navigate = useNavigate()

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8800/posts")
      setPosts(res.data)
    }catch(err){
      console.log(err)
    }
  }
  fetchData()
}, [])

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8800/posts/${id}`, {
      data: { uid: currentUser.id, isAdmin: currentUser.isAdmin }
    })
    window.location.reload()
  } catch(err) {
    console.log(err)
  }
}

  return (
    <div className="home">
      <div className="posts">
      {posts.map(post => (
        <div className="post" key={post.id}>
          {currentUser?.isAdmin && (
            <div className="adminEdit">
              <Link to="/write" state={post}>
                <img src={Edit} alt="Szerkesztés" />
              </Link>
              <img onClick={() => handleDelete(post.id)} src={Delete} alt="Törlés" />
            </div>
          )}
          <div className="img">
            <img src={post.img} alt="" />
          </div>
          <div className="content">
          <Link className="link" to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: post?.desc }} />
          <Link className="link" to={`/post/${post.id}`}>
            <button>Olvass..</button>
          </Link>
          </div>
        </div>
      ))}
    </div>
    </div> 
  )
}

export default Home