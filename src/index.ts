import express from "express"
import morgan from "morgan"
import userRouter from "./routes/users"
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/users', userRouter)

app.listen(3000)