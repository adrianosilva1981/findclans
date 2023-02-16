import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()
const saltKey = process.env.SALT_KEY as jwt.Secret

const decodeToken = async(token: string) => {
  return jwt.verify(token, saltKey)
}

const generateToken = async(data: any) => {
  return jwt.sign(data, saltKey)
}

export default {
  decodeToken,
  generateToken
}