import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        isLoggedIn: false,
        error: null,
    },
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.error = null;

            const saveUserSession = async () => {
                try {
                    const jsonValue = JSON.stringify(action.payload);
                    await AsyncStorage.setItem('@user_session', jsonValue);
                } catch (e) {
                    console.error("Error saving user session: ", e);
                }
            };

            saveUserSession();
        },
        loginFailure(state, action) {
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.payload;

            const clearUserSession = async () => {
                try {
                    await AsyncStorage.removeItem('@user_session');
                } catch (e) {
                    console.error("Error clearing user session: ", e);
                }
            };

            clearUserSession();
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.error = null;

            const clearUserSession = async () => {
                try {
                    await AsyncStorage.removeItem('@user_session');
                } catch (e) {
                    console.error("Error clearing user session: ", e);
                }
            };

            clearUserSession();
        },
    },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
