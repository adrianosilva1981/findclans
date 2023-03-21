import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import dotenv from 'dotenv'

dotenv.config()

export default class Encryptor {

  private privateKey: any = ''

  constructor () {
    this.privateKey = process.env.SALT_KEY
  }

  encrypt (message: string) {
    const hashDigest = sha256(message);
    return Base64.stringify(hmacSHA512(hashDigest, this.privateKey));
  }
}