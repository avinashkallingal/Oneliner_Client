import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface MyDynamicObject {
    [key: string]: any;
  }

interface UserData {
    _id: string | null;
    email: string | null;
    name: string | null;
    avatar:string | null;
}

// interface chatData {
//     _id: string | null;
//     participants:string[] | null;
//     lastMessage?: Types.ObjectId | null;
// }


interface chatState{
    chatBoxDisplay:boolean;
    token?:string | null;
    userData?:UserData|null;
    chatRoomData?:MyDynamicObject|null;
}

const initialState: chatState = {
    chatBoxDisplay: false,
    token: null,
    userData: null,
    chatRoomData:null
}

  
  
const chatDisplaySlice = createSlice({
    name: 'ChatDisplay',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<{ token: string|null; userData: UserData |null;chatRoomData: MyDynamicObject|null}>) => {
            state.chatBoxDisplay = true;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
            state.chatRoomData=action.payload.chatRoomData;
            
        },
        hide: (state) => {
            state.chatBoxDisplay = false;
            state.token = null;
            state.userData = null;
        }
        
    }
})

export const { show, hide } = chatDisplaySlice.actions
export default chatDisplaySlice