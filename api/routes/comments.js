import express from "express"
import { getComments, addComment, deleteComment, updateComment } from "../controllers/comment.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/post/:postId", getComments)
router.post("/", verifyToken, addComment)
router.put("/:id", verifyToken, updateComment)
router.delete("/:id", verifyToken, deleteComment)

export default router