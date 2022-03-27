const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  isEvent: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  contentMessage: {
    type: String,
    required: true,
  },
  dateCreation: {
    type: Number,
    required: true,
  },
});

module.exports = model("Message", MessageSchema);
