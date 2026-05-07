import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '../components/menu'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext.jsx'

function Single() {
  const [post, setPosts] = useState({})
  const postId = location.pathname.split("/")[2]
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/posts/${postId}`)
        setPosts(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [postId])

 const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:8800/posts/${postId}`, {
            data: { uid: currentUser.id, isAdmin: currentUser.isAdmin }
        })
        navigate("/")
    } catch(err) {
        console.log(err)
    }
}

  return (
    <div className='single'>
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          <img src={post?.userImg} alt="" />
          <div className="info">
            <span>{post?.username}</span>
            <p>Posztolva {moment(post?.date).fromNow()}</p>
          </div>
          {(currentUser?.id === post?.userId || currentUser?.isAdmin) && (
    <div className="edit">
        <Link to="/write" state={post}>
            <img src={Edit} alt="Szerkesztés" />
        </Link>
        <img onClick={handleDelete} src={Delete} alt="Törlés" />
    </div>

          )}
        </div>
        <h1>{post?.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post?.desc }} />
      </div>
      <Menu />
    </div>
  )
}

export default Single