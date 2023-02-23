import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()
const saltKey = process.env.SALT_KEY as jwt.Secret

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      message: 'RESTRICT ACCESS'
    })
  } else {
    jwt.verify(token, saltKey, (error: any) => {
      if (error) {
        res.status(401).json({
          message: 'INVALID TOKEN'
        })
      } else {
        next()
      }
    })
  }
}

export default {
  authorize
}