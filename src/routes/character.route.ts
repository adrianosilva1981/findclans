import express from 'express'
import { CharacterController } from '../modules/characters/CharacterController'
// import authMiddleware from '../middlewares/auth.mid'

const characterController = new CharacterController()
const router = express.Router()

router.get('/', characterController.create)
router.get('/{id}', characterController.create)
router.post('/', characterController.create)
router.put('/{id}', characterController.create)
router.delete('/{id}', characterController.create)

export default router