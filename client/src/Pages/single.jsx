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
  const [comments, setComments] = useState([])
  const [commentDesc, setCommentDesc] = useState("")
  const [editComment, setEditComment] = useState(null)
  const [editDesc, setEditDesc] = useState("")
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/comments/post/${postId}`)
        setComments(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchComments()
  }, [postId])

 const handleDelete = async () => {
  try {
    await axios.delete(`http://localhost:8800/posts/${postId}`, {
      withCredentials: true,
      data: { uid: currentUser.id, isAdmin: currentUser.isAdmin }
    })
    navigate("/")
  } catch (err) {
    console.log(err)
  }
}

const handleAddComment = async () => {
  try {
    await axios.post("http://localhost:8800/comments", {
      desc: commentDesc,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      uid: currentUser.id,
      postId: postId
    }, { withCredentials: true })
    setCommentDesc("")
    const res = await axios.get(`http://localhost:8800/comments/post/${postId}`)
    setComments(res.data)
  } catch(err) {
    console.log(err)
  }
}

const handleDeleteComment = async (id) => {
  try {
    await axios.delete(`http://localhost:8800/comments/${id}`, {
      withCredentials: true,
      data: { uid: currentUser.id, isAdmin: currentUser.isAdmin }
    })
    const res = await axios.get(`http://localhost:8800/comments/post/${postId}`)
    setComments(res.data)
  } catch(err) {
    console.log(err)
  }
}

const handleEditComment = async (id) => {
  try {
    await axios.put(`http://localhost:8800/comments/${id}`, {
      desc: editDesc,
      uid: currentUser.id,
      isAdmin: currentUser.isAdmin,
      edited: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    }, { withCredentials: true })
    setEditComment(null)
    setEditDesc("")
    const res = await axios.get(`http://localhost:8800/comments/post/${postId}`)
    setComments(res.data)
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


<div className="comments">
          <h2>Hozzászólások</h2>
          {currentUser && (
            <div className="addComment">
              <input
                type="text"
                placeholder="Írj egy hozzászólást..."
                value={commentDesc}
                onChange={(e) => setCommentDesc(e.target.value)}
              />
              <button onClick={handleAddComment}>Küldés</button>
            </div>
          )}
          {comments.map(comment => {
            return (
              <div className="comment" key={comment.id}>
                <div className="commentInfo">
                  <span className="commentUser">{comment.username}</span>
                  <span className="commentDate">{moment(comment.date).fromNow()}</span>
                </div>
                {editComment === comment.id 
                  ? (
                    <div className="editComment">
                      <input
                        type="text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                      <button onClick={() => handleEditComment(comment.id)}>Mentés</button>
                      <button onClick={() => setEditComment(null)}>Mégse</button>
                    </div>
                  ) : (
                    <p>{comment.desc}</p>
                  )
                }
                {!!(currentUser?.id === comment.uid || currentUser?.isAdmin) && (
                  <div className="commentButtons">
                    <img onClick={() => {
                      setEditComment(comment.id)
                      setEditDesc(comment.desc)
                    }} src={Edit} alt="Szerkesztés" />
                    <img onClick={() => handleDeleteComment(comment.id)} src={Delete} alt="Törlés" />
                  </div>
                )}
                {comment.edited && (
                  <span className="editedInfo">
                    Szerkesztve: {moment(comment.edited).fromNow()}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <Menu />
    </div>
  )
}


export default Single