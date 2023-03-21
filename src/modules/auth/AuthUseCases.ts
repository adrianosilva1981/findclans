import UserRepository from '../repository/UserRepository';
import Encryptor from '../../utils/Encryptor';
import JwtUtil from '../../utils/JwtUtil';


export default class GetAuth {

  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async auth (email: string, password: string): Promise<any> {
    const encryptor = new Encryptor()
    password = encryptor.encrypt(password)
    const user = await this.userRepository.find({ email, password })
    if (!user.length) {
      return []
    }

    const jwtUtil = new JwtUtil()
    const data = {
      id: user[0].id,
      name: user[0].name,
      birthday: user[0].birthday,
      avatar: user[0].avatar
    }

    return jwtUtil.generateToken(data)
  }

}
