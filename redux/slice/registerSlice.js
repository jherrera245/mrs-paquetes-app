import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        isRegistered: false,
        error: null,
        loading: false,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.user = action.payload;
            state.isRegistered = true;
            state.loading = false;
            state.error = null;
        },
        registerFailure(state, action) {
            state.user = null;
            state.isRegistered = false;
            state.loading = false;
            state.error = action.payload;
        },
        registerReset(state) {
            state.user = null;
            state.isRegistered = false;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { registerRequest, registerSuccess, registerFailure, registerReset } = registerSlice.actions;
export default registerSlice.reducer;
