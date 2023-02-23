import express from 'express'
import { GetInfoController } from '../modules/info/useCases/getInfo/GetInfoController'

const router = express.Router()

router.get('/', GetInfoController.handle)

export default router