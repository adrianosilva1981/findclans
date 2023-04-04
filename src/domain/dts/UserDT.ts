import { Users } from "@prisma/client";

export default class UserDT {
  static convertPublicUserData(user: Users): Object {
    const publicUserData: any = user;
    delete publicUserData.password;
    return user;
  }

  static convertUserDatatoUpdate(data: any): Users {
    delete data.email;
    delete data.password;
    return data as Users;
  }
}
