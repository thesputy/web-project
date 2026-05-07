import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios"

const Home = () => {

const [posts, setPosts] = useState([])

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


  return (
    <div className="home">
      <div className="posts">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="img">
            <img src={post.img} alt="" />
          </div>
          <div className="content">
          <Link className="link" to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
          </Link>
          <p>{post.desc}</p>
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