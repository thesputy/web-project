import express from "express"
import { getComments, addComment, deleteComment, updateComment } from "../controllers/comment.js"

const router = express.Router()

router.get("/post/:postId", getComments)
router.post("/", addComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)

export default router