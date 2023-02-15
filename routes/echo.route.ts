import express from 'express'
import echoRouter from '../controllers/echo.controller'

const router = express.Router()

router.get('/', echoRouter.echo)

export default router