import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/posts", postRoutes)
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/comments", commentRoutes)

app.listen(8800, () => {
    console.log("Server is running on port 8800")
})