const MessageModel = require("../model/message-model");
const UserModel = require("../model/user-model");

class MessageService {
  async createUserMessage(name, contentMessage) {
    const user = await UserModel.findOne({ name });
    return await MessageModel.create({
      userId: user._id,
      contentMessage,
      dateCreation: Date.now(),
    });
  }

  async createEventMessage(contentMessage) {
    return await MessageModel.create({
      contentMessage,
      dateCreation: Date.now(),
    });
  }
}

module.exports = new MessageService();
