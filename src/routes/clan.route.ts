import express from 'express'
import { ClanController } from '../modules/clans/ClanController'
import authMiddleware from '../middlewares/authorize.mid'

const clanController = new ClanController()
const router = express.Router()

router.get('/', authMiddleware.authorize, clanController.find)
router.get('/:id', authMiddleware.authorize, clanController.getById)
router.post('/', authMiddleware.authorize, authMiddleware.isAdmin, clanController.create)
router.put('/:id', authMiddleware.authorize, authMiddleware.isAdmin, clanController.update)
router.delete('/:id', authMiddleware.authorize, authMiddleware.isAdmin, clanController.delete)

export default router