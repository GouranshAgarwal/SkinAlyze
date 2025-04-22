// hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type MessageHandler = (from: string, message: string) => void;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  // Initialize the backend socket server once on mount
  useEffect(() => {
    fetch("/api/socket");
  }, []);

  const connect = (username: string, onMessage: MessageHandler) => {
    if (socketRef.current?.connected) return;

    const socket = io();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("register", username);
      setConnected(true);
    });

    socket.on("private-message", ({ from, message }) => {
      onMessage(from, message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    socketRef.current = socket;
  };

  const sendMessage = (to: string, from: string, message: string) => {
    socketRef.current?.emit("private-message", { to, from, message });
  };

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setConnected(false);
  };

  return {
    connect,
    sendMessage,
    disconnect,
    connected,
  };
};
