import RequestService from "./RequestService"
import jwt_decode from "jwt-decode"
import dotenv from 'dotenv'
dotenv.config()


export default class FindClansService extends RequestService {

  private token: string = ''
  private baseUrl: string = process.env.FIND_CLANS_URL as string
  private headers: any = {}

  constructor() {
    super();
  }

  async getCharacters(page: number = 1, limit: number = 10) {
    await this.auth()
    const url = `${this.baseUrl}/characters?page=${page}&limit=${limit}`
    return await this.request('GET', url, {}, this.headers)
  }

  private async auth() {
    if (!this.isValidToken()) {
      const { FIND_CLANS_URL, CLIENT_ID, CLIENT_SECRET } = process.env
      const url = `${FIND_CLANS_URL}/token`
      const payload = {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
      }

      const { body, status } = await this.request('POST', url, payload)
      if (status !== 200) {
        throw new Error('Impossible to authenticate at FindClassApi');
      }

      this.token = body.access_token
      this.headers = { Authorization: `Bearer ${this.token}` }
    }
  }

  private isValidToken() {
    try {
      const { exp = 0 } = jwt_decode(this.token) as any
      return Number(exp) * 1000 > Date.now()
    } catch (error) {
      return false
    }
  }
}