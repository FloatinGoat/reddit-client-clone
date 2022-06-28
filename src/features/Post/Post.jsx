import React, { useState } from "react";
import moment from 'moment';
import {
  TiMessage,
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
} from 'react-icons/ti';
import './Post.css';
import Comment from '../Comment/Comment';
import ReactMarkdown from 'react-markdown';
import '../../utils/loader.css'

export const Post = (props) => {
  /* 
  For the purpose of this exercise, and using this non-official API, the votes won't change as there is no Auth in place.
  There is, nonetheless, a mimic functionality below.
  */
  const { post, onToggleComments } = props,
    [voteValue, setVoteValue] = useState(0);

  const onHandleUserVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0)
    } else if (newValue === 1) {
      setVoteValue(1)
    } else {
      setVoteValue(-1)
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick className="icon-action" />;
    }
    return <TiArrowUpOutline className="icon-action" />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick className="icon-action" />;
    }
    return <TiArrowDownOutline className="icon-action" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return 'up-vote';
    }
    if (voteValue === -1) {
      return 'down-vote';
    }

    return '';
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div className='loading'><div className="lds-facebook"><div></div><div></div><div></div></div></div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
  }

  const renderContent = () => {

    if (post.is_video || post.media) {
      return <p>Sorry, this content is not available at this time.</p>
    } else if (post.selftext === '') {
      return <img src={post.url} alt="" className="post-image" />
    } else {
      return (<div className="post-text">
        <ReactMarkdown children={post.selftext} />
      </div>)
    }
  }

  return (
    <>
      <div className='post-container'>
        {/* Create a link to the post itself, so that when user clicks on title, sends him to the desired webside */}
        <div className='main-content'>
          <a href={`https://www.reddit.com${post.permalink}`} target="_blank" className="post-link" rel="noreferrer">
            <h2 className='post-title'>{post.title}</h2>
          </a>

          <div className='post-content'>
            {renderContent()}
          </div>
        </div>

        <div className='details-wrapper'>
          <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${voteValue === 1 && 'active'
                }`}
              onClick={() => onHandleUserVote(1)}
              aria-label="Up vote"
            >
              {renderUpVote()}
            </button>

            <p className={`post-votes-value ${getVoteType()}`}>
              {post.score}
            </p>

            <button
              type="button"
              className={`icon-action-button down-vote ${voteValue === -1 && 'active'
                }`}
              onClick={() => onHandleUserVote(-1)}
              aria-label="Down vote"
            >
              {renderDownVote()}
            </button>
          </div>

          <div className='meta-wrapper'>
            <div className='post-details'>
              <p>Posted by <span>{post.author}</span>, {moment.unix(post.created_utc).fromNow()}</p>
            </div>

            <div className="post-comments">
              <button
                type="button"
                className={`icon-action-button ${post.showingComments && 'showing-comments'
                  }`}
                onClick={() => onToggleComments(post.permalink)}
                aria-label="Show comments"
              >
                <TiMessage className="icon-action" />
              </button>
              {post.num_comments}
            </div>
          </div>
        </div>
      </div >
      <div className='comments'>
        {renderComments()}
      </div>
    </>
  )
}