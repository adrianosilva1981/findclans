import express from 'express'
import infoController from '../controllers/info.controller'
// import authMiddleware from '../middlewares/auth.mid'


const router = express.Router()

router.get('/', infoController.echo)

export default router