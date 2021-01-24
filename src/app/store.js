import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const API = "https://test-api-server.herokuapp.com";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
