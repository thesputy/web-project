import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Menu = () => {

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
    <div className='menu'>
        <h1>Más posztok amik tetszhetnek..</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={post.img} alt={post.title} />
                <h2>{post.title}</h2>
                <button>Olvass..</button>
            </div>
        ))}
    </div>
  )
}

export default Menu