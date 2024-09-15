import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        hasProfile: false,
        error: null,
    },
    reducers: {
        checkProfile(state, action) {
            state.hasProfile = action.payload.status.exists;
        },
        profileSuccess(state, action) {
            state.profile = action.payload;
            state.hasProfile = true;
            state.error = null;
        },
        profileFailure(state, action) {
            state.profile = null;
            state.hasProfile = false;
            state.error = action.payload;
        }
    },
});

export const { checkProfile, profileSuccess, profileFailure, logout } = profileSlice.actions;
export default profileSlice.reducer;
