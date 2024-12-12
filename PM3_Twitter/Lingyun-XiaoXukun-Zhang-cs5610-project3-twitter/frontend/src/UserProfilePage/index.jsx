import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import Post from "../Post";
import "./style.css";
import { UserContext } from "../context/userContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const UserProfile = () => {
  const { username } = useParams();
  const { currentUser } = useContext(UserContext);
  const loggedInUsername = currentUser ? currentUser.username : null;

  const [currentSearchUser, setCurrentSearchUser] = useState(null);
  const [postsByUsername, setPostsByUsername] = useState([]);
  const [
    isLoggedInUsernameMatchCurrentSearchUser,
    setIsLoggedInUsernameMatchCurrentSearchUser,
  ] = useState(false);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState("");
  const maxLength = 200;

  const fetchUserByUserName = async () => {
    try {
      const response = await axios.get(`/api/users/${username}`);
      console.log("successfully fetch user by url params username");
      setCurrentSearchUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const fetchPostsByUserName = async () => {
    try {
      const response = await axios.get(`/api/posts/${username}`);
      setPostsByUsername(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  // Fetch user and posts while loading
  useEffect(() => {
    fetchUserByUserName();
    fetchPostsByUserName();
  }, [username]);

  // Update match status when `currentSearchUser` changes
  useEffect(() => {
    if (currentSearchUser?.username === loggedInUsername) {
      setIsLoggedInUsernameMatchCurrentSearchUser(true);
    } else {
      setIsLoggedInUsernameMatchCurrentSearchUser(false);
    }
  }, [currentSearchUser, loggedInUsername]);

  const handleDeletePost = async (deletePostId) => {
    try {
      const response = await axios.delete(`/api/posts/delete/${deletePostId}`);
      console.log("Post deleted successfully!", response.data);
      // Delete success, re-fetch posts
      fetchPostsByUserName();
    } catch (e) {
      console.error(
        "The post can't be deleted!",
        e.response?.data || e.message
      );
    }
  };

  const handleUpdateDescription = async () => {
    try {
      const response = await axios.put("/api/users/update/description", {
        username: currentSearchUser.username,
        description: descriptionInput
      });
      setCurrentSearchUser(response.data);
      setIsEditingDescription(false);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  // Order posts by time using useMemo
  const orderedPosts = useMemo(() => {
    if (!Array.isArray(postsByUsername)) return [];
    return postsByUsername.sort((post1, post2) => {
      const time1 = new Date(post1.postTime).getTime();
      const time2 = new Date(post2.postTime).getTime();
      return time2 - time1;
    });
  }, [postsByUsername]);

  return (
    <div className="profile-container">
      <NavBar />
      {currentSearchUser ? (
        <div className="user-info-container">
          <div className="username-text">{currentSearchUser.username}</div>
          <img
            src={currentSearchUser.avatar}
            alt="User Avatar"
            className="profile-avatar"
          />
          <div>{currentSearchUser.nickname}</div>
          {currentSearchUser.description !== undefined && (
            <div className="description-container">
              {isEditingDescription && isLoggedInUsernameMatchCurrentSearchUser ? (
                <div className="edit-description">
                  <textarea
                    value={descriptionInput}
                    onChange={(e) => {
                      if (e.target.value.length <= maxLength) {
                        setDescriptionInput(e.target.value);}
                      }}
                    placeholder="Add a description about yourself"
                    maxLength={maxLength}
                  />
                  <div className="description-info">
                    <span className="char-count">
                      {descriptionInput.length}/{maxLength}
                    </span>
                    <div className="description-buttons">
                      <button onClick={handleUpdateDescription}>Save</button>
                      <button onClick={() => setIsEditingDescription(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="description-display" onClick={() => {
                  if (isLoggedInUsernameMatchCurrentSearchUser) {
                    setDescriptionInput(currentSearchUser.description);
                    setIsEditingDescription(true);
                  }
                }}>
                  {currentSearchUser.description || "Add a description"}
                  {isLoggedInUsernameMatchCurrentSearchUser && (
                    <span className="edit-hint">(Click to edit)</span>
                  )}
                </div>
              )}
            </div>
          )}
          <div>Registered On: {formatDate(currentSearchUser.timeStamp)}</div>
        </div>
      ) : (
        <div>Loading user profile...</div>
      )}

      <div className="posts-container">
        {orderedPosts.length > 0 ? (
          orderedPosts.map((post) => (
            <Post
              key={post._id}
              post={{
                ...post,
                postTime: formatDate(post.postTime),
              }}
              isLoggedInUserNameMatchPostUserName={
                isLoggedInUsernameMatchCurrentSearchUser
              }
              onDelete={() => {
                handleDeletePost(post._id);
              }}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
