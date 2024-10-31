// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import userAuthSlice from '../Slice/UserSlice';
// import adminAuthSlice from '../Slice/AdminSlice';
// import chatDisplaySlice from '../Slice/ChatSlice';
// import messageStoreSlice from '../Slice/MessageSlice';


// const persistConfiguration = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const rootReducer = combineReducers({
//     UserAuth: userAuthSlice.reducer,
//     AdminAuth: adminAuthSlice.reducer,
//     ChatDisplay: chatDisplaySlice.reducer,
//     messageStore:messageStoreSlice.reducer
   
// })

// const persistedReducer = persistReducer(persistConfiguration, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             }
//         })
// });

// export const persistor = persistStore(store);

// export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userAuthSlice from '../Slice/UserSlice';
import adminAuthSlice from '../Slice/AdminSlice';
import chatDisplaySlice from '../Slice/ChatSlice';
import messageStoreSlice from '../Slice/MessageSlice';

// Persist configuration for user and admin slices
const persistConfiguration = {
    key: 'root',
    version: 1,
    storage,
}

// Create persisted reducers for user and admin
const persistedUserReducer = persistReducer(persistConfiguration, userAuthSlice.reducer);
const persistedAdminReducer = persistReducer(persistConfiguration, adminAuthSlice.reducer);

// Combine reducers
const rootReducer = combineReducers({
    UserAuth: persistedUserReducer,
    AdminAuth: persistedAdminReducer,
    ChatDisplay: chatDisplaySlice.reducer, // No persistence
    messageStore: messageStoreSlice.reducer // No persistence
});

// Configure the store with the combined reducers
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
