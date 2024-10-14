// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import snackbar from './snackbar';
import loadingSlice from 'store/slices/loadingSlice';
import auth from "./auth";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  loadingSlice,
  auth
});

export default reducers;
