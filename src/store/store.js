import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import channelReducer from "./channel"

const store = configureStore({
    reducer:{
        counter: counterReducer,
        channel: channelReducer
    }
})

export default store;
