import express from 'express'
import { GetInfoController } from '../src/modules/info/useCases/getInfo/GetInfoController'

const router = express.Router()

router.get('/', GetInfoController.handle)

export default router