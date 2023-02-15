import { Request, Response } from 'express'
import Info from '../domains/echo/Info'

const info = new Info()

const echo = (req: Request, res: Response) => {
  res.send({
    request: req.headers,
    info: info.echo()
  })
}

export default {
  echo
}