import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import userDataReducer from './slices/userDataSlice';

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  userData: userDataReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
