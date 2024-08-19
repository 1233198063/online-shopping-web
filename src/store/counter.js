import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        count: 1
    },
    reducers: {
        add(state, action){
            console.log(state, action);
        }
    }
})

export const {add} = counterSlice.actions

const counterReducer = counterSlice.reducer
export default counterReducer