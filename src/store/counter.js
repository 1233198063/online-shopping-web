import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        count: 1
    },
    reducers: {
        // action:{type,payload}
        add(state, action){
            state.count += action.payload
        },
        subtract(state, action) {   
            if (state.count > 0) {
                state.count -= action.payload;
            }
        }
    }
})

export const { add,subtract } = counterSlice.actions

const counterReducer = counterSlice.reducer
export default counterReducer