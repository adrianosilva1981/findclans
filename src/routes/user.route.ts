import express from 'express'
import { UserController } from '../modules/users/UserController'
import authMiddleware from '../middlewares/authorize.mid'

const userController = new UserController()
const router = express.Router()

router.post('/register', userController.create)

router.get('/', authMiddleware.authorize, userController.find)
router.get('/:id', authMiddleware.authorize, userController.getById)
router.post('/', authMiddleware.authorize, authMiddleware.isAdmin, userController.create)
router.put('/:id', authMiddleware.authorize, authMiddleware.isAdmin, userController.update)
router.delete('/:id', authMiddleware.authorize, userController.delete)
router.put('/update-acess/:id', authMiddleware.authorize, userController.updateAcess)

router.get('/favorites/characters/:id', authMiddleware.authorize, userController.getUserFavoriteCharacters)
router.post('/favorites/characters', authMiddleware.authorize, userController.createUserFavoriteCharacter)
router.delete('/favorites/characters/:id', authMiddleware.authorize, userController.deleteFavoriteCharacter)

router.get('/favorites/clans/:id', authMiddleware.authorize, userController.getUserFavoriteClans)
router.post('/favorites/clans', authMiddleware.authorize, userController.createUserFavoriteClan)
router.delete('/favorites/clans/:id', authMiddleware.authorize, userController.deleteFavoriteClan)

export default router