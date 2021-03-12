import { PrismaClient, User } from '@prisma/client'
import { Router } from 'express'
import * as yup from 'yup'

const router = Router()

const prisma = new PrismaClient()

const userSchema = yup.object({
  id: yup.string().notRequired(),
  email: yup.string().required('email é obrigatório'),
  name: yup.string().required('nome é obrigatório'),
})

router.get('/', async (_, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post<{}, {}, User>('/', async (req, res) => {
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

export default router