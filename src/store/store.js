import { configureStore, combineReducers } from '@reduxjs/toolkit';
import postsSliceReducer from './postsSlice';
import subredditSliceReducer from './subredditsSlice';

export default configureStore({
  reducer: combineReducers({
    posts: postsSliceReducer,
    subreddits: subredditSliceReducer,
  }),
});
