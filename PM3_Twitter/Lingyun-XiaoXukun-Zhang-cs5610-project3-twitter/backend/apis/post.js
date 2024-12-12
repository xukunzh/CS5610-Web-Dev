const express = require("express");
const router = express.Router();

const PostModel = require("../db/post/post.model");
const {
  createPost,
  findPostsByUsername,
  findAllPosts,
  findPostByPostId,
  deletePostById,
  deletePostsByUsername
} = require("../db/post/post.model");

// Create: generate a new post
router.post("/newpost", async function (req, res) {
  const { username, postTime, content, media, nickname, avatar } = req.body;

  try {
    if (!username || !content) {
      return res.status(400).send("Missing username, posttime, or content");
    }

    if (content.length > 280) {
      return res.status(400).send("Post content cannot exceed 280 characters");
    }

    const newPost = await createPost({
      username,
      nickname,
      avatar,
      postTime,
      content,
      media,
    });
    res.status(201).send(newPost); // response includes newPost
  } catch (e) {
    console.error("Error creating post:", e);
    res.status(500).send("No new post has been added!");
  }
});

// Read: get all posts of a specific user
router.get("/:username", async function (req, res) {
  const username = req.params.username;
  try {
    const posts = await findPostsByUsername(username);
    if (!posts) {
      return res.status(404).send("No posts found");
    }
    res.send(posts); // response includes all posts
  } catch (e) {
    console.error("Error retrieving posts:", e);
    res.status(500).send("Error retrieving posts");
  }
});

// Read: get all posts by all users
router.get("/", async function (req, res) {
  const allPosts = await findAllPosts();
  if (!allPosts) {
    res.send("There is no post exist!");
  }
  res.send(allPosts);
});

// Update: update a post
router.put("/update/:postId", async function (req, res) {
  const postId = req.params.postId;
  console.log("Received postId:", postId);
  const { content, media, postTime } = req.body;

  try {
    // Check content length
    if (content && content.length > 280) {
      return res.status(400).send("Post content cannot exceed 280 characters");
    }

    const post = await findPostByPostId(postId);
    if (!post) {
      return res
        .status(404)
        .send("The post with id: ", postId, " can not be found!");
    }
    if (content) post.content = content;
    if (media !== undefined) post.media = media;
    post.postTime = postTime; // update the post time as the update time
    const updatedPost = await post.save();
    res.status(200).send(updatedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Error fetching post!");
  }
});

// Updatepage: fetch the original post content
router.get("/get/:postId", async function (req, res) {
  const postId = req.params.postId;
  console.log(`Received postId: ${postId}`);

  try {
    const post = await findPostByPostId(postId);
    if (!post) {
      console.log(`The post with id: ${postId} cannot be found!`);
      return res
        .status(404)
        .send(`The post with id: ${postId} cannot be found!`);
    }
    res.status(200).send(post);
    console.log(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Error fetching post!");
  }
});

// Delete: delete a post
router.delete("/delete/:postId", async function (req, res) {
  const postId = req.params.postId;
  console.log("Received postId:", postId);

  try {
    const post = await findPostByPostId(postId);
    if (!post) {
      return res
        .status(404)
        .send("The post with id: ", postId, " can not be found!");
    }
    await deletePostById(postId);
    res.status(200).send("Post deleted successfully!");
  } catch (e) {
    console.error("Error deleting post:", e);
    res.status(500).send("Error deleting post");
  }
});

// Delete all posts from a username
router.delete("/deleteByUsername/:username", async function (req, res) {
  const { username } = req.params;
  console.log("Deleting all posts for username:", username);

  try {
    await deletePostsByUsername(username);
    res.status(200).send("All posts for user deleted successfully!");
  } catch (e) {
    console.error("Error deleting posts:", e);
    res.status(500).send("Error deleting posts");
  }
});

module.exports = router;
