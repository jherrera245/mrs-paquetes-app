import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: null,
        error: null,
        loading: false,
    },
    reducers: {
        addressSuccess(state, action) {
            state.address = action.payload;
            state.loading = false;
            state.error = null;
        },
        addressFailure(state, action) {
            state.address = null;
            state.loading = false;
            state.error = action.payload;
        },
        addressReset(state) {
            state.address = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { addressSuccess, addressFailure, addressReset } = addressSlice.actions;
export default addressSlice.reducer;
