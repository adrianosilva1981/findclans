import express from 'express'
import { AuthController } from '../modules/auth/AuthController'

const authController = new AuthController()
const router = express.Router()

router.post('/', authController.auth)

export default router