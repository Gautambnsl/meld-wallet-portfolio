import { createSlice } from '@reduxjs/toolkit';
import { getDecryptedCookie } from '../../utils/functions/commonFunctions';
import { cookieKeys } from '../../utils/constants/constants';

const initialState = {
  user: getDecryptedCookie(cookieKeys.cookieUser) || {
    token: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoginData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserLoginData } = userSlice.actions;

export default userSlice.reducer;
