/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alertAddress: '',
  alertType: [''],
  email: '',
  isAlertOn: false,
  loginCount: 0,
  name: '',
  phoneNumber: '',
  premiumService: 'free',
  tempAddress: '',
  visitCount: 0,
  walletAddress: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        // @ts-ignore
        state[field] = value;
      }
    },
  },
});

export const { getUserData, updateField } = userDataSlice.actions;

export default userDataSlice.reducer;
