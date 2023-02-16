import { Request, Response } from 'express'
import Auth from '../domains/auth/Auth'

const authDomain = new Auth()

const auth = (req: Request, res: Response) => {
  try {
    const { user, password } = req.body
    const authorize = authDomain.auth(user, password)

    if (!authorize) {
      res.redirect('/unauthorized')
      return
    }

    res.send(authorize)
  } catch (error) {
    res.status(500).send(error)
  }
}

export default {
  auth
}