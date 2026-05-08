import request from "supertest"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import postRoutes from "../routes/posts.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/posts", postRoutes)

describe("Posts API tesztek", () => {

    test("GET /posts - visszaadja a posztokat", async () => {
        const res = await request(app)
            .get("/posts")
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    test("POST /posts - token nélkül 401-es hibát ad", async () => {
        const res = await request(app)
            .post("/posts")
            .send({
                title: "Teszt poszt",
                desc: "Teszt leírás"
            })
        expect(res.statusCode).toBe(401)
    })

})