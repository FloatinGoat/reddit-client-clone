import { createSlice } from '@reduxjs/toolkit';
import { getPosts, getPostComments } from '../api/redditAPI';

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
};

const postsSlice = createSlice({
  name: 'redditPosts',
  initialState,
  reducers: {
    // Reducer to getting posts from API
    getPostsPending(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    // Comments Reducers
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
    },
    getCommentsPending(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
  },
});

export const {
  getPostsPending,
  getPostsSuccess,
  getPostsFailed,
  toggleShowingComments,
  getCommentsPending,
  getCommentsSuccess,
  getCommentsFailed,
} = postsSlice.actions

export default postsSlice.reducer;

/* Selectors */
export const selectPosts = (state) => state.posts.posts;

/* Async Thunks to fetch posts and fetch comments. */

// Fetches the posts from a subreddit. Useful when the subreddit changes.
export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(getPostsPending());
    const posts = await getPosts(subreddit);

    // We are adding showingComments and comments as additional fields to the posts object in order to show them when the user wants to.
    // This way we are merging the comments API endpoint with this one and dealing with the comments' toggling in the post's object.
    const postsWithComments = posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));
    dispatch(getPostsSuccess(postsWithComments));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

// Fetching Comments based on each Post
export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(getCommentsPending(index));
    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed(error));
  }
};