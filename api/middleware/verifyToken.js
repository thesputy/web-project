import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Nincs jogosultságod!")

    jwt.verify(token, "jwtSecretKey", (err, user) => {
        if (err) return res.status(403).json("Token érvénytelen!")
        req.user = user
        next()
    })
}