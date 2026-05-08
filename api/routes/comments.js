import express from "express"
import { getComments, addComment, deleteComment, updateComment } from "../controllers/comment.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { body } from "express-validator"
import { validate } from "../middleware/validate.js"

const router = express.Router()

router.get("/post/:postId", getComments)
router.post("/", verifyToken, [
    body("desc")
        .notEmpty().withMessage("Komment tartalma kötelező!")
        .isLength({ min: 1 }).withMessage("Komment nem lehet üres!")
], validate, addComment)
router.put("/:id", verifyToken, [
    body("desc")
        .notEmpty().withMessage("Komment tartalma kötelező!")
], validate, updateComment)
router.delete("/:id", verifyToken, deleteComment)

export default router