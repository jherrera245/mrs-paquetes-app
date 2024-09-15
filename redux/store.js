import { configureStore } from "@reduxjs/toolkit";
import loginReducer  from "./slice/loginSlice";
import registerReducer from "./slice/registerSlice";
import profileReducer from "./slice/profileSlice";
import recoverReducer from "./slice/recoverSlice";
import addressReducer from "./slice/addressSlice";
import orderDetailsReducer from "./slice/orderDetailsSlice";

export default configureStore({
    reducer : {
        login: loginReducer,
        register: registerReducer,
        profile: profileReducer,
        recover: recoverReducer,
        address: addressReducer,
        orderDetails: orderDetailsReducer
    }
});