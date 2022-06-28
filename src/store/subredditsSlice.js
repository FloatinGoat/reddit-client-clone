import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/redditAPI';

const initialState = {
  subreddits: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/',
};

const subredditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    // Reducers to get the Subreddits
    getSubredditsPending(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    // setting searchTerm & subreddits Reducers
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
  },
});

export const {
  getSubredditsPending,
  getSubredditsFailed,
  getSubredditsSuccess,
  setSearchTerm,
  setSelectedSubreddit,
} = subredditSlice.actions;

export default subredditSlice.reducer;

/* The subreddits state selectors */
export const selectSearchTerm = (state) => state.subreddits.searchTerm;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;
// A selector for the filtered subreddits, according to the searchTerm.
export const selectFilteredSubs = createSelector(
  [selectSubreddits, selectSearchTerm],
  (subs, searchTerm) => {
    if (searchTerm !== '') {
      return subs.filter((sub) =>
      sub.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    searchTerm = '';
    return subs;
  }
);

// This is a Redux Thunk that gets subreddits.
export const fetchSubreddits = () => async (dispatch) => {
  try {
    dispatch(getSubredditsPending());
    const subreddits = await getSubreddits();
    dispatch(getSubredditsSuccess(subreddits));
  } catch (error) {
    dispatch(getSubredditsFailed());
  }
};