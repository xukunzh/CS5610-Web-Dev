import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Post = ({ post, isLoggedInUserNameMatchPostUserName, onDelete }) => {
  if (!post) {
    return <div>Post not found</div>;
  }
  const postId = post._id;

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="User Avatar" className="avatar" />
        <div className="user-info">
          <div className="user-name">
            {post.nickname && <span className="nickname">{post.nickname}</span>}
            <Link to={`/user/${post.username}`} className="username">
              @{post.username}
            </Link>
          </div>
          <div className="timestamp">{post.postTime}</div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.media && post.media.data && (
          <div className="post-media">
            <img src={post.media.data} alt="Post media" className="post-image"/>
          </div>
        )}
        {isLoggedInUserNameMatchPostUserName ? (
          <div>
            <Link to={`/updatepost/${postId}`}>Update this post</Link>
            <button className="delete-button" onClick={onDelete}>
              delete post
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Post;
