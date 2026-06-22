'use client';

import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
}

export const useSocket = create<SocketState>()((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (token: string) => {
    const { socket } = get();

    if (socket?.connected) return;

    const newSocket = io("http://localhost:3000/events", {
      auth: { token },
     withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("connected", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.log("socket error:", err.message);
    });

    newSocket.on("online:users", (users) => {
      set({ onlineUsers: users });
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();

    socket?.disconnect();
    set({ socket: null });
  },
}));