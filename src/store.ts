// Import necessary functions from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import formSlice from './formSlice';


// Configure the Redux store
const store = configureStore({
 reducer: {
    // Use your reducer, keyed by the state slice it manages
    form: formSlice,
 },
});

// Export the store so it can be used in your application
export default store;


// import { createSlice, configureStore } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {},
//   reducers: {
//     setUser: (state, action) => {
//       return action.payload;
//     },
//   },
// });

// export const { setUser } = userSlice.actions;

// const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//   },
// });

// export default store;
