import { axiosInstance } from "@/lib/aixos";
import { create } from "zustand";
import { Message, User } from "../types";
import { io } from "socket.io-client";
interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null;

  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectedSocket: () => void;
  sendMessage: (receiverId: string, senderId: string, content: string) => void;
  fetchMessages: (userId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
}

//Khoi tao ket noi Websocket giua client va server bang thu vien socket.io
const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

const socket = io(baseURL, {
  autoConnect: false, //only connect if user is authenticated
  withCredentials: true, //gui thong tin nhu cookie de ket noi den server
});

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: true,
  error: null,
  socket: socket,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchUsers: async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      set({ users: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  initSocket: (userId) => {
    //Kiem tra xem nguoi dung da ket noi voi server chua
    //Chua thi tiep tuc ket noi
    if (!get().isConnected) {
      socket.auth = { userId }; //Thiet lap xac thuc userId server se dung thong tin nay de nhan dien nguoi dung

      socket.connect(); //Thuc hien ket noi websocket
      socket.emit("user_connected", userId); //Gui su kien user_connected

      socket.on("users_online", (users: string[]) => {
        //Lang nghe nguoi dung dang truc tuyen tu server
        set({ onlineUsers: new Set(users) }); //Cap nhat bang cach chuyen danh sach nhan duoc
      });

      socket.on("activities", (activities: [string, string][]) => {
        //lang nghe danh sach hoat dong nguoi dung tu server
        set({ userActivities: new Map(activities) }); //Cap nhat trang thao userActitvities bang cach chuyen danh sach 1 map
      });

      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      socket.on("receive_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("message_sent", (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }));
      });

      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true });
    }
  },

  disconnectedSocket: () => {
    if (get().isConnected) {
      socket.disconnect();
      set({ isConnected: false });
    }
  },

  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket;
    if (!socket) return;
    socket.emit("send_message", { senderId, receiverId, content });
  },

  fetchMessages: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/users/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      set({ error: error.response.error.data });
    } finally {
      set({ isLoading: false });
    }
  },
}));
