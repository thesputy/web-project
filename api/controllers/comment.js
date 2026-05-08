import { db } from "../db.js"

export const getComments = (req, res) => {
    const q = "SELECT c.id, c.uid, c.edited, u.username, c.desc, c.date FROM comments c JOIN users u ON c.uid = u.id WHERE c.postId = ? ORDER BY c.date DESC"
    
    db.query(q, [req.params.postId], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json(data)
    })
}

export const addComment = (req, res) => {
    const q = "INSERT INTO comments(`desc`, `date`, `uid`, `postId`) VALUES (?)"
    const values = [
        req.body.desc,
        req.body.date,
        req.body.uid,
        req.body.postId
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json("Komment hozzáadva!")
    })
}

export const deleteComment = (req, res) => {
    const q = req.body.isAdmin 
        ? "DELETE FROM comments WHERE id = ?"
        : "DELETE FROM comments WHERE id = ? AND uid = ?"

    db.query(q, req.body.isAdmin ? [req.params.id] : [req.params.id, req.body.uid], (err, data) => {
        if (err) return res.json(err)
        if (data.affectedRows === 0) return res.status(403).json("Nem engedélyezett!")
        return res.status(200).json("Komment törölve!")
    })
}

export const updateComment = (req, res) => {
    const q = req.body.isAdmin
        ? "UPDATE comments SET `desc` = ?, `edited` = ? WHERE id = ?"
        : "UPDATE comments SET `desc` = ?, `edited` = ? WHERE id = ? AND uid = ?"

    db.query(q, req.body.isAdmin 
        ? [req.body.desc, req.body.edited, req.params.id] 
        : [req.body.desc, req.body.edited, req.params.id, req.body.uid], 
    (err, data) => {
        if (err) return res.json(err)
        if (data.affectedRows === 0) return res.status(403).json("Nem engedélyezett!")
        return res.status(200).json("Komment frissítve!")
    })
}