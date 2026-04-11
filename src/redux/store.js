import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commonReducer from "./slices/commonSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    common: commonReducer,
  },
});

export default store;  // ✅ FIX