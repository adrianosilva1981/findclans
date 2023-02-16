import jwt, { Jwt } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default class TokenService {

  private saltKey = process.env.SALT_KEY as jwt.Secret

  async decodeToken(token: string) {
    return jwt.verify(token, this.saltKey)
  }

  async generateToken(data: any) {
    const expiresIn = new Date().getMinutes() + 30
    return jwt.sign(data, this.saltKey, { expiresIn })
  }

}
