import { createSlice } from '@reduxjs/toolkit';

const recoverSlice = createSlice({
    name: 'recover',
    initialState: {
        user: null,
        error: null,
        loading: false,
    },
    reducers: {
        recoverSuccess(state, action) {
            state.user = action.payload;
            state.isrecovered = true;
            state.loading = false;
            state.error = null;
        },
        recoverFailure(state, action) {
            state.user = null;
            state.isrecovered = false;
            state.loading = false;
            state.error = action.payload;
        },
        recoverReset(state) {
            state.user = null;
            state.isrecovered = false;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { recoverRequest, recoverSuccess, recoverFailure, recoverReset } = recoverSlice.actions;
export default recoverSlice.reducer;
