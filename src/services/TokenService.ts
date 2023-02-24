import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default class TokenService {

  private saltKey = process.env.SALT_KEY as jwt.Secret
  private token: string = ''

  constructor (token: string) {
    this.token = token
  }

  async decodeToken() {
    try {
      return await jwt.verify(this.token, this.saltKey)
    } catch (error) {
      return false
    }
  }
}