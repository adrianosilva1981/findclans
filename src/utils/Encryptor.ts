import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import dotenv from 'dotenv'
import { hash, compare } from 'bcryptjs'

dotenv.config()

export default class Encryptor {

  private privateKey: any = ''

  constructor () {
    this.privateKey = process.env.SALT_KEY
  }

  async ncrypt (message: string) {

    const hashResult = await hash(message, 6);

    // const doesPawordMatch = await compare(pass, user.password)

    /* if (!doesPawordMatch) {
      throw new Error("");
    } */

    const hashDigest = sha256(message);
    return Base64.stringify(hmacSHA512(hashDigest, this.privateKey));
  }

}