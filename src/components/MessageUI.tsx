import React, { useState, useEffect } from 'react';
import { Bell, Paperclip, Send } from 'lucide-react';
import Sidebar from './SideBar';
import { useSocket } from '@/hooks/useSocket';

export default function MessageUI() {
  const [activeConversation, setActiveConversation] = useState('emma');
  const [username, setUsername] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { connect, sendMessage, connected } = useSocket();

  useEffect(() => {
    // Connect socket when username is set
    if (username) {
      connect(username, (from, msg) => {
        setMessages((prev) => [...prev, {
          id: Date.now(),
          sender: 'patient', // you could enhance this with actual logic
          avatar: from[0]?.toUpperCase() || 'P',
          content: msg,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      });
    }
  }, [username]);

  const handleSend = () => {
    if (!username || !receiver || !message) return;
    sendMessage(receiver, username, message);
    setMessages((prev) => [...prev, {
      id: Date.now(),
      sender: 'doctor',
      avatar: 'D',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-sky-600 flex flex-col">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex">
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2 w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Receiver username"
            />
          </div>

          <div className="overflow-y-auto h-full">
            {/* [ ...conversation listing same as before... ] */}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Message</h2>
              <p className="text-sm text-gray-500">Chat with {receiver || "..."}</p>
            </div>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                1
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-6 ${msg.sender === 'doctor' ? 'justify-end' : ''}`}>
                {msg.sender === 'patient' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 mt-1">{msg.avatar}</div>
                )}
                <div className="max-w-lg">
                  <div className={`p-3 rounded-2xl ${msg.sender === 'doctor' ? 'bg-sky-600 text-white rounded-tr-sm' : 'bg-gray-200 rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${msg.sender === 'doctor' ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
                {msg.sender === 'doctor' && (
                  <div className="w-8 h-8 rounded-full bg-sky-700 flex items-center justify-center ml-2 mt-1 text-white">{msg.avatar}</div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex items-center">
            <button className="p-2 text-gray-500 hover:text-sky-600"><Paperclip className="w-5 h-5" /></button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mx-4 p-3 border border-gray-200 rounded-full"
              placeholder="Type your message here..."
            />
            <button onClick={handleSend} className="p-2 text-sky-600 hover:text-sky-800"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
