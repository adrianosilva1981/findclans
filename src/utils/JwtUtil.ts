import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default class JwtUtil {

  private saltKey = process.env.SALT_KEY as jwt.Secret

  generateToken(data: object) {
    const expiresIn = new Date().getMinutes() + 30
    const jwtInfo = {
      ...data,
      ... {
        expiresIn
      }
    }
    return {
      accessToken: jwt.sign(jwtInfo, this.saltKey, { expiresIn })
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