import dotenv from 'dotenv'
dotenv.config()

export default class GetInfo {

  execute() {
    const {
      NAME,
      VERSION,
      PRODUCTION,
      DOMAIN,
      PORT
    } = process.env

    return {
      name: NAME,
      version: VERSION,
      production: PRODUCTION,
      domain: DOMAIN,
      port: PORT
    }
  }

  credentials() {
    const { API_USER, PASSWORD, SALT_KEY } = process.env

    return {
      apiUser: API_USER,
      password: PASSWORD,
      saltKey: SALT_KEY
    }
  }

}
