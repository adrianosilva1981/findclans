import express from 'express'
import { CreateCharacterController } from '../modules/characters/useCases/createCharacter/CreateCharacterController'
// import authMiddleware from '../middlewares/auth.mid'

const router = express.Router()

router.post('/', CreateCharacterController.handle)

export default router