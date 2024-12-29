import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("https://oneliner.website", {
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
  askSocketId(userId:any){
  this.socket.emit("askingSocketId",userId)
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

  offNewMessage(callback: () => void) {
    this.socket.off('newMessage', callback); // Unsubscribe the specific listener
  }

  // video call

  joinRoom(userId: string) {
    this.socket.emit('joinRoom', userId);
  }



  //new
  receiveSocketId(callback: (id: any) => void){
    this.socket.on('me', callback);
  }

  receiveCallUser(callback: (data: any) => void){
    this.socket.on('callUser', callback);
  }

  
  recieveCallAccepted(callback: (signal: any) => void){
    this.socket.on('callAccepted', callback);
  }


  emitCalluser(data:{
    userToCall: any,
    signalData: any,
    from: any,
    name: any
  }){
    this.socket.emit("callUser",  {userToCall: data.userToCall,
      signalData:data.signalData,
      from: data.from,
      name: data.name});
  }

 
  emitAnswerCall(value:{ signal: any, to: any }){
    
    this.socket.emit("answerCall",  { signal: value.signal, to: value.to });
  }


  






  //old
  sendOffer(offer: { chatId: string, senderId: string,senderName:string, receiverId: string,offer:any}) {
    this.socket.emit("user:call", {offer });
  }

  incomingNotification(callback: (offer: any) => void) {
    this.socket.on('incomming:call', callback); // Unsubscribe the specific listener
    
  }

  acceptCall(ans: { chatId: string, senderId: string,senderName:string, receiverId: string,ans:any}) {
    this.socket.emit('call:accepted', {ans}); // Unsubscribe the specific listener
    
  }
  

  getAcceptConform(callback: (ans: any) => void) {
    this.socket.on('call:accepted:confirm', callback); // Unsubscribe the specific listener
    
  }
  //old
  
  
  
}

export default new SocketService();
