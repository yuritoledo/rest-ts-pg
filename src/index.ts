import { PrismaClient, User } from "@prisma/client"
import express from "express"
import morgan from "morgan"
import * as yup from 'yup'

const app = express()

const prisma = new PrismaClient()

app.use(express.json())
app.use(morgan('dev'))

app.get('/users', async (_, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

const userSchema = yup.object({
  id: yup.string().notRequired(),
  email: yup.string().required('email é obrigatório'),
  name: yup.string().required('nome é obrigatório'),
})

app.post<{}, {}, User>('/users', async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false })

    const newUser = await prisma.user.create({
      data: req.body
    })

    res.json({ newUser })
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

app.listen(3000)