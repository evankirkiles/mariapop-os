import { combineReducers } from 'redux';
import { appSlice } from '../features/appSlice';
// import themeReducer from '../features/themeSlice';
// import userReducer from '../features/userSlice';

const rootReducer = combineReducers({
  // theme: themeReducer,
  // user: userReducer,
  [appSlice.name]: appSlice.reducer
});

export default rootReducer;
