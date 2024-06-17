import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [commentSchema], // This is the key for nested comments
});

commentSchema.pre("save", async function (next) {
  // This function ensures replies also get saved
  const comments = this.replies;
  for (const comment of comments) {
    await comment.save();
  }
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
