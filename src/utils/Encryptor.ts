import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

export default class Encryptor {

  private privateKey: any = ''

  constructor () {
    this.privateKey = process.env.SALT_KEY
  }

  encrypt (message: string): string {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(message, salt)
    // return Base64.stringify(hmacSHA512(hash, this.privateKey))
    return hash
  }

  compare(text: string, reference: string): boolean {
    return bcrypt.compareSync(text, reference);
  }
}