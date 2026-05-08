import request from "supertest"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "../routes/auth.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRoutes)

describe("Auth API tesztek", () => {

    test("Regisztráció - hiányzó felhasználónév esetén 400-as hibát ad", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                username: "",
                email: "teszt@teszt.com",
                password: "123456"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.errors).toBeDefined()
    })

    test("Regisztráció - érvénytelen email esetén 400-as hibát ad", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                username: "tesztuser",
                email: "nemvalidemail",
                password: "123456"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.errors).toBeDefined()
    })

    test("Bejelentkezés - hiányzó jelszó esetén 400-as hibát ad", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                username: "tesztuser",
                password: ""
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.errors).toBeDefined()
    })

})