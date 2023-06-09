import jwt, { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default class JwtUtil {

  private saltKey = process.env.SALT_KEY as jwt.Secret

  generateToken(data: object) {
    const expiresIn = 30 * 60
    return {
      accessToken: jwt.sign(data, this.saltKey, {})
    }
  }

  async decodeToken(token: string) {
    try {
      return jwt.decode(token);
    } catch (error) {
      return false
    }
  }
}