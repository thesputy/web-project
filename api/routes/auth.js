import express from "express"
import { register, login, logout } from "../controllers/auth.js"
import { body } from "express-validator"
import { validate } from "../middleware/validate.js"

const router = express.Router()

router.post("/register", [
    body("username")
        .notEmpty().withMessage("Felhasználónév kötelező!")
        .isLength({ min: 3 }).withMessage("Felhasználónév legalább 3 karakter legyen!"),
    body("email")
        .notEmpty().withMessage("Email kötelező!")
        .isEmail().withMessage("Érvénytelen email cím!"),
    body("password")
        .notEmpty().withMessage("Jelszó kötelező!")
        .isLength({ min: 6 }).withMessage("Jelszó legalább 6 karakter legyen!")
], validate, register)

router.post("/login", [
    body("username")
        .notEmpty().withMessage("Felhasználónév kötelező!"),
    body("password")
        .notEmpty().withMessage("Jelszó kötelező!")
], validate, login)

router.post("/logout", logout)

export default router