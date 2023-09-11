import {createSlice} from "@reduxjs/toolkit";


const userSlices = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setLogin: (state, action) => {
            return action.payload;
        }
    }
})

export default userSlices;
