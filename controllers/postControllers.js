import Post from "../Models/Post.js";
import User from "../Models/Users.js";
import asyncHandler from "express-async-handler";

//add post
export const addPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const post = new Post({
    user: user._id,
    name: user.name,
    avatar: user.avatar,
    text: "Write here",
    likes: [],
    comments: [],
    postImage: "/image/sample.jpg",
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

//update post
export const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { text, image } = req.body;
    if (post) {
      post.text = text;
      post.postImage = image;
      const updatedPost = await post.save();
      res.json(updatedPost);
    }
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//delete post
export const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("No post found");
    }
    if (post.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error("The token failed you");
    }
    res.json({ message: "Post is deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//get post by id
export const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("No post found");
    }
    res.json(post);
  } catch (e) {
    console.log(e.message);
    if (e.kind === "ObjectId") {
      res.status(404);
      throw new Error("Post not found");
    }
    res.status(500);
    throw new Error(e.message);
  }
});

//get all posts
export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
    res.json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//like post
export const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if its been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      res.status(400);
      throw new Error("Post already liked");
    }
    //unshift like to like array
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//unlike post
export const unlikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if its been liked
    if (
      (post.likes.filter(
        (like) => like.user.toString() === req.user.id
      ).length = 0)
    ) {
      res.status(400);
      throw new Error("Post has not been liked");
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//add comment
export const addComment = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      avatar: user.avatar,
      name: user.name,
      text: req.body.text,
      user: req.user.id,
    };
    //unshift
    post.comments.unshift(newComment);
    await post.save();
    res.json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//remove comment
export const deleteComment = asyncHandler(async (req, res) => {
  try {
    //find post
    const post = await Post.findById(req.params.id);
    //pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      res.status(400);
      throw new Error("Comment does not exist");
    }
    //check user
    if (comment.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error("User not authorized");
    }
    //removeIndex functionality
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//like comment
export const likeComment = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pullout comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //check comment exists
    if (!comment) {
      res.status(400);
      throw new Error("Comment does not exist");
    }
    //check user is authorized
    if (comment.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error("User is not authorized");
    }
    //check comments (if its been liked )
    if (
      comment.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      res.status(400);
      throw new Error("Comment has been liked");
    }

    comment.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.log(e.message);
    res.status(500);
    throw new Error(e.message);
  }
});

//unlike comment
export const unlikeComment = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pullout comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //check if comment exists
    if (!comment) {
      res.status(400);
      throw new Error("Comment does not exist");
    }
    //check if user is authorized
    if (comment.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error("User is not authorized");
    }
    const removeIndex = comment.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    comment.likes.splice(removeIndex, 1);
    await post.save();
    res.json(comment);
  } catch (e) {
    console.log(e.message);
    res.status(400);
    throw new Error(e.message);
  }
});
