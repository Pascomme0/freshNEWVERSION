// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    payLink: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setPayLink: (state, action) => {
            state.payLink = action.payload;
        }
        // reset: () => initialState,
    },
});

export const { setUser, setToken, setPayLink } = userSlice.actions;
export default userSlice.reducer;