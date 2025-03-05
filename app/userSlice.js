// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    payLink: null,
    activeMenu: null,
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
        },
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        }
        // reset: () => initialState,
    },
});

export const { setUser, setToken, setPayLink, setActiveMenu } = userSlice.actions;
export default userSlice.reducer;