import React from 'react'

const menu = () => {

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

export default menu