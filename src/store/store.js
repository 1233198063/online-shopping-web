import { configureStore, combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import cartReducer from "./cart";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine multiple reducers
const reducers = combineReducers({
    counter: counterReducer,
})

// persistent configuration
const persistConfig = {
    key:'root',
    // Storage location, defaults to localStorage
    storage,
    whiteList:[],
    blackList:[]
}

// Process the reducer
const persistedReducer = persistReducer(persistConfig, reducers)

// Combinator module
const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({
            // close serializable check
            serializableCheck: false
        })
    }
})

// Process the store
export const persistor = persistStore(store)

export default store;
