import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import "./style.css";

export const CreateOrUpdatePostPage = ({ isCreatePost }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [originalPost, setOriginalPost] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const username = currentUser.username;
  const nickname = currentUser.nickname;
  const avatar = currentUser.avatar;

  const [content, setContent] = useState("");
  const maxLength = 280;
  const [media, setMedia] = useState(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size should be less than 5MB");
        return;
      }
      setImageFile(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmitNewPost = async () => {
    try {
      if (!content.trim()) {
        alert("Please enter some content");
        return;
      }

      let media = null;
      if (imageFile) {
        const base64 = await convertToBase64(imageFile);
        media = {
          data: base64,
          contentType: imageFile.type
        };
        console.log("Prepared media:", { contentType: imageFile.type });
      }

      const newPost = {
        username: username,
        nickname: nickname,
        avatar: avatar,
        postTime: Date.now(),
        content: content,
        media
      };

      console.log("Submitting new post with media:", 
        { ...newPost, media: media ? { contentType: media.contentType } : null }
      );
      const response = await axios.post("/api/posts/newpost", newPost);
      console.log("Post created successfully:", response.data);
      navigate("/talktown");
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
    }
  };

  const handleUpdatePost = async () => {
    // update the original post and response including the updatedPost
    try {
      let media = originalPost.media; 
      if (imageFile) {
        const base64 = await convertToBase64(imageFile);
        media = {
          data: base64,
          contentType: imageFile.type
        };
      } else if (imagePreview === null) {
        media = null;
      }
      
      const updatedPost = {
        username: username,
        nickname: nickname,
        avatar: avatar,
        postTime: Date.now(),
        content: content,
        media: media,
      };
  
      const response = await axios.put(
        `/api/posts/update/${postId}`,
        updatedPost
      );
      console.log("Post updated successfully!");
      navigate(`/user/${username}`);
    } catch (e) {
      console.error("Error updating post:", e.response || e.message);
    }
  };

  const handleCancel = () => {
    const confirmMessage = isCreatePost 
      ? "Are you sure you want to cancel creating this post?" 
      : "Are you sure you want to cancel editing this post?";
    
    if (content.trim() && !window.confirm(confirmMessage)) {
      return;
    }
    
    if (!isCreatePost) {
      navigate(`/user/${username}`);
    } else {
      navigate("/talktown");
    }
  };

  useEffect(() => {
    const fetchOriginalPost = async () => {
      try {
        const response = await axios.get(`/api/posts/get/${postId}`);
        const fetchedPost = response.data;
        if (fetchedPost.media && fetchedPost.media.data) {
          setImagePreview(fetchedPost.media.data);
        }
        console.log("Original Post is:", fetchedPost);
        setContent(fetchedPost.content); // Set it into text box directly
        setOriginalPost(fetchedPost);
      } catch (e) {
        console.error("Error fetching original post:", e.response || e.message);
      }
    };

    if (!isCreatePost && postId) {
      fetchOriginalPost();
    }
  }, [postId, isCreatePost]);

  return (
    <div className="create-post-container">
      <h2>{isCreatePost ? "Create New Post" : "Edit Post"}</h2>
      <div className="user-info">
        <img src={avatar} alt="User Avatar" className="user-avatar" />
        <div className="user-details">
          <div className="username">{username}</div>
          <div className="nickname">{nickname}</div>
        </div>
      </div>
      <div className="content-input">
        <textarea
          value={content}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              setContent(e.target.value);
            }
          }}
          maxLength={maxLength}
          placeholder="What's happening?"
        />
        <div className="char-count">
          {content.length}/{maxLength}
        </div>
      </div>

      <div className="media-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="image-upload"
          className="hidden"
        />
        <label htmlFor="image-upload" className="upload-button">
          Add Image
        </label>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button onClick={handleRemoveImage} className="remove-image">
              Remove Image
            </button>
          </div>
        )}
      </div>
      
      <div className="button-group">
        <button 
          className="cancel-button" 
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="submit-button"
          onClick={isCreatePost ? handleSubmitNewPost : handleUpdatePost}
          disabled={!content.trim()}
        >
          {isCreatePost ? "Post" : "Save Changes"}
        </button>
      </div>
    </div>
  );
};
