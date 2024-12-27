import { Server } from "socket.io"; //De tao mot web socket
import { Message } from "../models/message.model.js";

//Giao tiep thoi gian thuc giua client va server
export const initializeSocket = (server) => {
  //Khoi tao mot instance cua socket.io duoc gan vao server -> Buoc dau khoi tao luong giao tiep thoi gian thuc

  const io = new Server(server, {
    cors: {
      //Giup client co dia chi "http:localhost:3000" co quyen truy cap vao server socket. Cau hinh can thiet khi client va server co 2 nguon goc khac nhau
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  //Luu anh xa giua userId va socketId. Moi nguoi dung se duoc lien ket voi mot socket rieng biet
  const userSocket = new Map(); //{userId: socketId}
  //Luu tru trang thai hoat dong nguoi dung
  const userActivities = new Map(); //{userId: [activities]}

  io.on("connection", (socket) => {
    //Khi mot client ket noi server co the lang nghe va phan hoi su kien
    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      //Broadcast to all connected socktes that this user just logged in
      io.emit("user_connected", userId); //gui thong tin den cac client

      socket.emit("users_online", Array.from(userSocket.keys())); //gui danh sach nguoi dung dang online

      io.emit("activities", Array.from(userActivities.entries())); //thong bao trang thai hoat dong cua tat ca client
    });
    //Cap nhat trang thai hoat dong cua nguoi dung
    // Khi nguoi dung gui su kien updated_actitvity server se nhan du lieu gom userId va activity
    socket.on("updated_activity", ({ userId, activity }) => {
      console.log("activity_updated", userId, activity);
      userActivities.set(userId, activity); //Sau do duoc luu vao activity
      io.emit("activity_updated", { userId, activity });
    });

    //Gui tin nhan theo thoi gian thuc
    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;
        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        //send to receiver in realtime, if they're online
        const receiverSocketId = userSocket.get(receiverId); ///Kiem tra xem nguoi nhan co dang online hay khong bang cach tim socketID tu userSocket
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.log("Message Error", error);
        socket.emit("Message Error", error.message);
      }
    });

    /**
     * Duyet qua useSocket de tim userId  khop voi socketId cua client vua ngat ket noi
     * XOa nguoi udng nay khoi userSocket va userActivities
     * Phat tin hieu user_disconnected de thong bao cho cac client khac rang nguoi dung nay da thoat
     *
     */
    socket.on("disconnect", () => {
      let disconnectUserId;
      for (const [userId, socketId] of userSocket.entries()) {
        //find disconnected user
        if (socketId === socket.id) {
          disconnectUserId = userId;
          userSocket.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      if (disconnectUserId) {
        io.emit("user_disconnected", disconnectUserId);
      }
    });
  });
};
