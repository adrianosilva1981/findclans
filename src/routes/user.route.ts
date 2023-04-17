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
router.put('/update-acess/:id', authMiddleware.authorize, userController.updateAcess)

router.get('/favorites/characters/:id', authMiddleware.authorize, userController.getUserFavoriteCharacters)
router.post('/favorites/characters', authMiddleware.authorize, userController.createUserFavorite)
router.delete('/favorites/characters/:id', authMiddleware.authorize, userController.deleteFavorite)

export default router