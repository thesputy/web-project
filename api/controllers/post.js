import { db } from "../db.js"

export const addPost = (req, res) => {
    const q = "INSERT INTO posts(`title`, `desc`, `img`, `date`, `uid`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.date,
        req.body.uid
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json("Post has been added")
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, u.id as userId, username, title, `desc`, p.img, date FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"

   db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json(data[0])
   })
}



export const deletePost = (req, res) => {
    const postID = req.params.id
    const q = "DELETE FROM posts WHERE id = ?"

    // ha admin, bármit törölhet, ha nem, csak a sajátját
    const q2 = "DELETE FROM posts WHERE id = ? AND uid = ?"

    const isAdmin = req.body.isAdmin
    
    db.query(isAdmin ? q : q2, isAdmin ? [postID] : [postID, req.body.uid], (err, data) => {
        if (err) return res.json(err)
        if (data.affectedRows === 0) return res.status(403).json("Nem engedélyezett művelet")
        return res.status(200).json("Post has been deleted")
    })
}

export const updatePost = (req, res) => {
    const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ? WHERE 'id' = ? AND 'uid' = ?"

    const postId = req.params.id

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.date,
        req.body.uid
    ]

    db.query(q, [...values, postId], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json("Post has been updated")
    })
}

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
}