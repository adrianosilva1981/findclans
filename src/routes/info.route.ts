import express from 'express'
import { GetInfoController } from '../modules/info/useCases/getInfo/GetInfoController'

const router = express.Router()

router.get('/', GetInfoController.handle)
router.get('/health-check', GetInfoController.handle)

export default router