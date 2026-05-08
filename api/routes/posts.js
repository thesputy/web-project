import express from "express"
import { addPost, getPost, getPosts, deletePost, updatePost } from "../controllers/post.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)

export default router