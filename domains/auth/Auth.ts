import jwt from 'jsonwebtoken'
import Info from '../info/Info'

export default class Auth {

  private credentials: any = Info.getCredentials()
  private info: any = Info.getInfo()

  auth (userIn: string, passwordIn: string) {
    const { user, password, saltKey } = this.credentials

    if (user !== userIn || password !== passwordIn) {
      return false
    }

    const expiresIn = new Date().getMinutes() + 30
    const data = {
      ...this.info,
      ... {
        expiresIn
      }
    }
    return {
      accessToken: jwt.sign(data, saltKey, { expiresIn })
    }
  }

}
