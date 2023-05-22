import express from 'express'
import { CharacterController } from '../modules/characters/CharacterController'
import authMiddleware from '../middlewares/authorize.mid'

const characterController = new CharacterController()
const router = express.Router()

router.get('/', authMiddleware.authorize, characterController.find)
router.get('/:id', authMiddleware.authorize, characterController.getById)
router.post('/', authMiddleware.authorize, authMiddleware.isAdmin, characterController.create)
router.put('/:id', authMiddleware.authorize, authMiddleware.isAdmin, characterController.update)
router.delete('/:id', authMiddleware.authorize, authMiddleware.isAdmin, characterController.delete)

export default router