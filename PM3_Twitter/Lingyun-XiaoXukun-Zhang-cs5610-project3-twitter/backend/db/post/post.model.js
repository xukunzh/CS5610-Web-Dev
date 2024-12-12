require("dotenv").config();
const mongoose = require("mongoose");
const PostSchema = require("./post.schema").PostSchema;

const postCollection = process.env.POST_COLLECTION || "postCollection";

// Create a model for the PostSchema
const PostModel = mongoose.model("PostModel", PostSchema, postCollection);

function createPost(post) {
  return PostModel.create(post);
}

function findPostsByUsername(username) {
  return PostModel.find({ username: username }).exec();
}

function findAllPosts() {
  return PostModel.find().exec();
}

function findPostByPostId(postId) {
  return PostModel.findOne({ _id: postId }).exec();
}

function deletePostById(postId) {
  return PostModel.deleteOne({ _id: postId });
}

function deletePostsByUsername(username) {
  return PostModel.deleteMany({ username: username }).exec();
}

module.exports = {
  PostModel,
  createPost,
  findAllPosts,
  findPostByPostId,
  findPostsByUsername,
  deletePostById,
  deletePostsByUsername,
};
