import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './subreddits.css';
import { fetchSubreddits, selectFilteredSubs, setSelectedSubreddit } from "../../store/subredditsSlice";
import '../../utils/loader.css'

const Subreddits = () => {
  const dispatch = useDispatch();
  const filteredSubreddits = useSelector(selectFilteredSubs);
  const subreddit = useSelector((state) => state.subreddits)
  const {isLoading, error, searchTerm } = subreddit

  useEffect(() => {
    dispatch(fetchSubreddits());
  },[]);


  if(isLoading) {
    <div class="lds-facebook"><div></div><div></div><div></div></div>
  }
  
  if (error) {
    return (
      <div className="error">
        <p>Failed to load.</p>
      </div>
    );
  }
   
  if (!isLoading && filteredSubreddits.length === 0) {
    return (
      <div className="error">
        <p> No subreddits were found while searching for '{searchTerm}'. Please search for another subreddit.</p>
      </div>
    )
  }

  return (
    <aside className="subreddits-container">
      <h3>Choose a Subreddit</h3>
      <ul className="subreddits-card">
        {filteredSubreddits.map((sub)=> 
          <li key={sub.id} id="subreddit">
            <button type="button" onClick={() => dispatch(setSelectedSubreddit(sub.url))}>
              <img
                  src={
                    sub.icon_img ||
                    'https://cdn.iconscout.com/icon/free/png-256/reddit-74-434748.png'
                  }
                  alt={`${sub.display_name}`}
                  className="subreddit-icon"
                  style={{ border: `3px solid ${sub.primary_color}` }}
                />
                {sub.display_name}
            </button>
          </li>
        )}
      </ul>
    </aside>
    )
}

export default Subreddits