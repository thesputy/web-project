import { db } from "../db.js"

export const register = (req, res) => {
    
    //Check if the user exists in the database
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists")
        // Proceed with registration
        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [req.body.username, req.body.email, req.body.password]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.status(200).json("User has been created")
        })
    })
}
    

export const login = (req, res) => {


    //Check if the user exists in the database
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err)
        if (data.length === 0) return res.status(404).json("Nem találtunk ilyen felhasználót")
        // Check if the password is correct
        if (data[0].password !== req.body.password) return res.status(400).json("Hibás jelszó")
        // Proceed with login
        return res.status(200).json(data[0])
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token").status(200).json("Kijelentkezve")
}