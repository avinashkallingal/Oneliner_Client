import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userAuthSlice from '../Slice/UserSlice';
import adminAuthSlice from '../Slice/AdminSlice';
import chatDisplaySlice from '../Slice/ChatSlice'


const persistConfiguration = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    UserAuth: userAuthSlice.reducer,
    AdminAuth: adminAuthSlice.reducer,
    ChatDisplay: chatDisplaySlice.reducer,
   
})

const persistedReducer = persistReducer(persistConfiguration, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;