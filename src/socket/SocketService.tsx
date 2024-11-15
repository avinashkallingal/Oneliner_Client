import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4000', {
      transports: ['websocket'],
      upgrade: false
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        this.socket.connect();
      }
    });


    this.socket.on('connect_error', (error) => {
      console.log('Socket connection error', error);
    });
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  joinConversation(chatId: string) {
    this.socket.emit('joinConversation', chatId);
  }

  onTyping(id: string) {
    this.socket.emit('userTyping', id)
  }
  // emitFetchOnlineUsers(id: string) {
  //   this.socket.emit('emitUserOnline', id)
  // }
  onGotOnlineUsers(callback: (onlineId:any) => void) {
    this.socket.on('emitUserOnline', callback)
  }
  onUserOnlineOff(callback: () => void) {
    this.socket.off('onUserOnline', callback)
  }
  
 
  onGotOfflineUsers(callback: (onlineId:any) => void) {
    this.socket.on('userOffline', callback)
  }


  sendMessage(message: { chatId: string, senderId: string, receiverId: string, content: string,updatedAt:string,_id:string,fileType:string }) {
    console.log(message," this is message^^^^^^^^^^^^^^^^^^^^^^^")
    this.socket.emit('sendMessage', message);
  }

  sendMedia(message: { chatId: string, senderId: string, receiverId: string, content: string,updatedAt:string,_id:string }) {
   console.log("hiii$$$$$$$$$$$$$$$$$$$$$")
   console.log(message)
    this.socket.emit('sendMessage', message)
  }

  emitUserOnlineStatus(userId: string) {
    console.log(userId);
    this.socket.emit('userConnected', userId);
  }

  // emitUserOffline(userId: string) {
  //   console.log(userId);
  //   this.socket.emit('userOffline', userId);
  // }

  onUserStatusChanged(callback: (data: { userId: string, isOnline: boolean }) => void) {
    this.socket.on('userStatusChanged', callback);
  }

  onNewNotification(callback: (notification: any) => void) {
    this.socket.on('newNotification', callback);
  }

  onUserTyping(callback: () => void) {
    this.socket.on('onUserTyping', callback)
  }

  onUserTypingOff(callback: () => void) {
    this.socket.off('onUserTyping', callback)
  }
  

  onNewMessage(callback: (message: any) => void) {
    this.socket.on('newMessage', callback);
  }

  offNewMessage(callback: (message: any) => void) {
    this.socket.off('newMessage', callback); // Unsubscribe the specific listener
  }

  // video call

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }
  
}

export default new SocketService();
