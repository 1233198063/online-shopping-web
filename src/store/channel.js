import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const channelSlice = createSlice({
    name: 'channelSlice',
    initialState: {
        channelList: [
            { id: 1, name: 'html' }
        ]
    },
    reducers: {
        getChannelList(state, action) {
            console.log(action.payload);
            state.channelList = action.payload
        }
    }
})

export const { getChannelList } = channelSlice.actions

export const fetchChannelList = ()=>{
    return async (dispatch)=>{
        const test = await axios.get('http://geek.itheima.net/v1_0/channels')
        // console.log(test)
        dispatch(getChannelList(test.data.data.channels))
    }
} 

const channelReducer = channelSlice.reducer
export default channelReducer