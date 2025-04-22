// pages/api/socket.ts
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { Socket as NetSocket } from 'net';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...');
    const io = new SocketIOServer(res.socket.server, {
      path: '/socket.io',
    });

    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);

      socket.on('register', (username: string) => {
        socket.data.username = username;
        socket.join(username); // join private room
      });

      socket.on('private-message', ({ to, from, message }) => {
        console.log(`Message from ${from} to ${to}: ${message}`);
        socket.to(to).emit('private-message', { from, message });
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
