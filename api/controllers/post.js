import { db } from "../db.js"

export const addPost = (req, res) => {
    res.json("Post has been added from controller")
}

export const getPost = (req, res) => {
    const q = "SELECT u.id as userId, username, title, `desc`, p.img, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"

   db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json(data[0])
   })
}



export const deletePost = (req, res) => {
    const postID = req.params.id
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?"

    db.query(q, [postID, req.body.userId], (err, data) => {
        if (err) return res.json(err)
        if (data.affectedRows === 0) return res.status(403).json("Nem engedélyezett művelet")
        return res.status(200).json("Post has been deleted")
    })
}

export const updatePost = (req, res) => {
    res.json("Post has been updated from controller")
}

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
}