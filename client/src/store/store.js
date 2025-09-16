import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userSlice/userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({ user : userReducer });

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    version : 1
  }
  
const persistedReducer = persistReducer(rootPersistConfig, rootReducer) 


export const store = configureStore({
  reducer: persistedReducer,
  // not show any error on browser
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck : false,
    }),
})

export const persistor = persistStore(store);