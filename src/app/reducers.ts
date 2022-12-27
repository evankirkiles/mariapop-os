import { combineReducers } from 'redux';
import { appSlice } from '../features/appSlice';
import {themeSlice} from '../features/themeSlice';
// import themeReducer from '../features/themeSlice';
// import userReducer from '../features/userSlice';

const rootReducer = combineReducers({
  // theme: themeReducer,
  // user: userReducer,
  [appSlice.name]: appSlice.reducer,
  [themeSlice.name]: themeSlice.reducer
});

export default rootReducer;
