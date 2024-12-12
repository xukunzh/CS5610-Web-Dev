const { Schema } = require("mongoose");
const postCollection = process.env.POST_COLLECTION || "postCollection";

exports.PostSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg",
    },
    postTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
      maxlength: [280, 'Post cannot be longer than 280 characters'] 
    },
    media: {
      data: String,
      contentType: String
    }
  },
  { collection: postCollection }
);
