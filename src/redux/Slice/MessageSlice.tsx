import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyDynamicObject {
    [key: string]: any;
  }

interface ChatMessage {
    chatId: string | null;
    senderId: string | null;
    receiverId: string | null;
    content: string | null;
}

interface MessageState {
    messages: MyDynamicObject[];
}

const initialState: MessageState = {
    messages: []
};

const messageStoreSlice = createSlice({
    name: 'messageStore',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ message: MyDynamicObject }>) => {
            const existingMessage = state.messages.find(msg => msg._id === action.payload.message._id);
            if (!existingMessage) {
                state.messages.push(action.payload.message);
            }
            // state.messages = [...state.messages, action.payload.message];
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    }
});

export const { addMessage, clearMessages } = messageStoreSlice.actions;
export default messageStoreSlice;
