import React from 'react'
import { Link } from "react-router-dom";

const home = () => {

  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate.",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate.",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, voluptate.",
      img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }

  ]

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

export default home