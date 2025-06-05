import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeSessions: 0,
    currentTime: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setActiveSessions(state, action){
            state.activeSessions = action.payload;
        },
        setCurrentTime(state, action){
            state.currentTime = action.payload;
        },
    },
});

export const {
    setActiveSessions,
    setCurrentTime,
} = appSlice.actions;

export default appSlice.reducer;