import express from 'express'
import credentialsMid from '../middlewares/credentials.mid'
import { GetAuthController } from '../src/modules/auth/useCases/getAuth/GetAuthController'


const router = express.Router()

router.post('/', credentialsMid.postIsValid, GetAuthController.handle)

export default router