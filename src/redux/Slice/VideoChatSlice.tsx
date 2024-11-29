import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface videoData {
    receivingCall?: boolean | null;
    caller?: string | null;
    callerSignal?: any | null;
    name?:string|null;
    callAccepted?:boolean | null;
    callEnded?: boolean | null;
}




const initialState: videoData = {
    receivingCall: null,
    caller: null,
    callerSignal: null,
    name:null,
    callAccepted:null,
    callEnded:null,
}

const videoChatSlice = createSlice({
    name: 'VideoChat',
    initialState,
    reducers: {
        recieve: (state, action: PayloadAction<{ receivingCall?: boolean|null;
            caller?: string|null ;
            callerSignal?: any | null;
            name?:string|null;
            callAccepted?:boolean|null;
            callEnded?: boolean|null; }>) => {

            
            state.receivingCall = action.payload.receivingCall;
            state.caller = action.payload.caller;
            state.callerSignal = action.payload.callerSignal;
            state.name = action.payload.name;
            state.callAccepted = action.payload.callAccepted;
            state.callEnded = action.payload.callEnded;
        },
        end: (state) => {
            state.receivingCall = null;
            state.caller = null;
            state.callerSignal = null;
            state.name = null;
            state.callAccepted = null;
            state.callEnded = null;
        }
    }
})

export const { recieve, end } = videoChatSlice.actions
export default videoChatSlice