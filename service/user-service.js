const UserModel = require("../model/user-model");

class UserService {
  async createUser(name) {
    return await UserModel.create({
      name,
    });
  }
}

module.exports = new UserService();
