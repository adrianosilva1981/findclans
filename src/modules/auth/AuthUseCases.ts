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
    const user = await this.userRepository.find({ email })
    if (!user.length) {
      return false
    }

    if (!encryptor.compare(password, user[0].password)) {
      return false
    }

    const jwtUtil = new JwtUtil()
    const data = {
      id: user[0].id,
      name: user[0].name,
      birthday: user[0].birthday,
      avatar: user[0].avatar,
      admin: user[0].admin,
    }

    return jwtUtil.generateToken(data)
  }

}
