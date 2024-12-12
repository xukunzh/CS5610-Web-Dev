import { useEffect } from "react";
import NavBar from "../NavBar";
import Post from "../Post";
import axios from "axios";
import { useState } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const TalkTownPage = () => {
  const [posts, setPosts] = useState([]);

  // fetch all posts from database when loading
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        console.log("posts list: ", response.data);
      } catch (e) {
        console.error("Error fetching posts:", e);
      }
    };

    fetchPosts();
  }, []);

  const orderedPosts = Array.isArray(posts)
    ? posts.sort((post1, post2) => {
        const time1 = new Date(post1.postTime).getTime();
        const time2 = new Date(post2.postTime).getTime();
        return time2 - time1;
      })
    : [];

    return (
      <div className="page-container">
        <NavBar />
        <div className="content-wrapper">
          {orderedPosts.length > 0 ? (
            <div className="posts-list">
              {orderedPosts.map((post) => (
                <div className="post-card">
                  <Post
                    key={post._id}
                    post={{
                      ...post,
                      postTime: formatDate(post.postTime)
                    }}
                    isLoggedInUserNameMatchPostUserName={false}
                  />
                </div>
              ))}
            </div>
           ) : (
          <div className="empty-state">
            <p>There are no posts yet. Be the first to post! </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkTownPage;
