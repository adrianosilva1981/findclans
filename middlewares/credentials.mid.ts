import { Request, Response, NextFunction } from 'express'
import ParamsValidator from "../utils/ParamsValidator"

const postIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new ParamsValidator()
    const { user, password } = req.body

    validator.isRequired(user, 'user is required')
    validator.isRequired(password, 'password is required')

    if (!validator.isValid()) {
        res.status(412).send(validator.errors)
        return
    }

    next()
}

export default {
  postIsValid
}