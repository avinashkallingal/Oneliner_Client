import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageCountState {
  count: number|null;
}

const initialState: MessageCountState = {
  count: null,
};

const messageCountSlice = createSlice({
  name: 'messageCount',
  initialState,
  reducers: {
    // Increment count by a given value
    incrementCount: (state, action: PayloadAction<number>) => {
        if(state.count){
            
            state.count += action.payload;}
        else{state.count =4}
      
    },

    // Decrement count by a given value
    decrementCount: (state, action: PayloadAction<number>) => {
        if(state.count)
      state.count -= action.payload;
    },

    // Set count to a specific value
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },

    // Clear count (reset to zero)
    clearCount: (state) => {
      state.count = null;
    },
  },
});

export const { incrementCount, decrementCount, setCount, clearCount } = messageCountSlice.actions;
export default messageCountSlice;
