import axios from "axios";

export default class RequestService {

  async request (method: string, url: string, data: {} = {}, headers: {} = {}) {
    let options = { method, url }

    if (Object.keys(data).length) options = { ...options, ...{ data }}
    if (Object.keys(headers).length) options = { ...options, ...{ headers }}

    try {
      const response = await axios.request(options)
      return {
        error: false,
        status: response.status,
        body: response.data
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: error.response,
          status: error.response?.status,
          body: error.response?.data
        }
      }

      throw error;
    }
  }
}