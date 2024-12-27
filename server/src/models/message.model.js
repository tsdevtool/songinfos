import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, require: true }, //Clerk user Id
    receiverId: { type: String, require: true }, //Clerk user Id
    content: { type: String, require: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
