import React, {useEffect} from 'react';
import './Card.css';
import { Post } from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  fetchComments,
  selectPosts,
} from '../../store/postsSlice';
import { setSearchTerm } from '../../store/subredditsSlice';

export const Card = () => {
  const posts = useSelector(selectPosts);
  const { isLoading, error } = posts;
  const subreddits = useSelector((state) => state.subreddits)
  const { searchTerm, selectedSubreddit } = subreddits;
  const dispatch = useDispatch();

  /* Fetch the posts from the selected Subreddit */
  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [selectedSubreddit]);


  /* Comments toggle function */
  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };
    
    return getComments;
  };
  
  /* Posts' loading and Error functionality */
  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button
          type="button"
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try again
        </button>
      </div>
    );
  }

  /* If there are no results for the search, display message */
  if (posts.length === 0) {
    return (
      <div className="error">
        <h2>No posts matching &ldquo;{searchTerm}&ldquo;</h2>
        <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
          Go home
        </button>
      </div>
    );
  }

  return (
    <>
    <h3 className='breadcrumbs'>Current Subreddit: {selectedSubreddit}</h3>
        <div className='cards-container'>
          {posts.map((post, index) => (
            <Post 
              key={post.id}
              post={post}
              onToggleComments={onToggleComments(index)}
            />
          ))}
        </div>
    </>
  )
}

export default Card;

