import express from 'express'
import authController from '../controllers/auth.controller'
import credentialsMid from '../middlewares/credentials.mid'


const router = express.Router()

router.post('/', credentialsMid.postIsValid, authController.auth)

export default router