import { Request, Response } from 'express'
import Info from '../domains/info/Info'

const echo = (req: Request, res: Response) => {
  res.send({
    info: {
      status: 'ok',
      ...Info.getInfo()
    }
  })
}

export default {
  echo
}