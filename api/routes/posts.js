import express from "express"
import { addPost, getPost, getPosts, deletePost, updatePost } from "../controllers/post.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { body } from "express-validator"
import { validate } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, [
    body("title")
        .notEmpty().withMessage("Cím kötelező!")
        .isLength({ min: 3 }).withMessage("Cím legalább 3 karakter legyen!"),
    body("desc")
        .notEmpty().withMessage("Leírás kötelező!")
], validate, addPost)
router.put("/:id", verifyToken, [
    body("title")
        .notEmpty().withMessage("Cím kötelező!"),
    body("desc")
        .notEmpty().withMessage("Leírás kötelező!")
], validate, updatePost)
router.delete("/:id", verifyToken, deletePost)

export default router