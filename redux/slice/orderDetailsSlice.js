import { createSlice } from '@reduxjs/toolkit';

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderDetails: null,
        error: null,
        loading: false,
    },
    reducers: {
        orderDetailsSuccess(state, action) {
            state.orderDetails = action.payload;
            state.loading = false;
            state.error = null;
        },
        orderDetailsFailure(state, action) {
            state.orderDetails = null;
            state.loading = false;
            state.error = action.payload;
        },
        orderDetailsReset(state) {
            state.orderDetails = null;
            state.error = null;
            state.loading = false;
        },
    },
});

export const { orderDetailsSuccess, orderDetailsFailure, orderDetailsReset } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
