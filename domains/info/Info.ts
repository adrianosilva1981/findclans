import dotenv from 'dotenv'
dotenv.config()

export default abstract class Info {

  public static getInfo() {
    const { NAME, VERSION, PRODUCTION, DOMAIN, PORT } = process.env

    return {
      name: NAME,
      version: VERSION,
      production: PRODUCTION,
      domain: DOMAIN,
      port: PORT
    }
  }

  public static getCredentials() {
    const { API_USER, PASSWORD, SALT_KEY } = process.env

    return {
      user: API_USER,
      password: PASSWORD,
      saltKey: SALT_KEY
    }
  }

}
