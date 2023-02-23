import jwt, { Secret } from 'jsonwebtoken'
import GetInfo from "../../../info/useCases/getInfo/GetInfo"

export default class GetAuth {

  execute(userIn: string, passwordIn: string): {} {
    const getInfo = new GetInfo()
    const { apiUser, password, saltKey } = getInfo.credentials()

    if (apiUser !== userIn || password !== passwordIn) {
      return false
    }

    const expiresIn = new Date().getMinutes() + 30
    const data = {
      ...getInfo.execute(),
      ... {
        expiresIn
      }
    }
    return {
      accessToken: jwt.sign(data, saltKey as Secret, { expiresIn })
    }
  }

}
