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

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  try {
    if (!token) {
      throw new Error('INVALID TOKEN')
    }

    const userData = jwt.verify(token, saltKey)
    if (!(<any>userData)?.admin) {
      throw new Error('RESTRICT ACCESS LEVEL')
    }

    next()
  } catch (error) {
    res.status(401).json({
      message: 'RESTRICT ACCESS'
    })
  }
}

export default {
  authorize,
  isAdmin
}