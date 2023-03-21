import express from 'express'
import credentialsMid from '../middlewares/credentials.mid'
import { AuthController } from '../modules/auth/AuthController'

const authController = new AuthController()
const router = express.Router()

router.post('/', credentialsMid.postIsValid, authController.auth)

export default router