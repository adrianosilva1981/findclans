import express from 'express'
import { UserController } from '../modules/users/UserController'
import authMiddleware from '../middlewares/authorize.mid'

const userController = new UserController()
const router = express.Router()

router.get('/', authMiddleware.authorize, userController.find)
router.get('/:id', authMiddleware.authorize, userController.getById)
router.post('/', authMiddleware.authorize, userController.create)
router.put('/:id', authMiddleware.authorize, userController.update)
router.delete('/:id', authMiddleware.authorize, userController.delete)

export default router