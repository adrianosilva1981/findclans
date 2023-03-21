import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default class JwtUtil {

  private saltKey = process.env.SALT_KEY as jwt.Secret

  generateToken(data: object) {
    const expiresIn = 30 * 60
    return {
      accessToken: jwt.sign(data, this.saltKey, { expiresIn })
    }
  }

  async decodeToken(token: string) {
    try {
      return await jwt.verify(token, this.saltKey)
    } catch (error) {
      return false
    }
  }
}