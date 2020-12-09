import express from "express";
import auth from "../../middleware/auth.js";
import {
  addPost,
  deleteComment,
  deletePost,
  likeComment,
  unlikeComment,
  addComment,
  getAllPosts,
  getPost,
  updatePost,
  unlikePost,
  likePost,
} from "../../controllers/postControllers.js";
const router = express.Router();

router.route("/").post(auth, addPost).get(auth, getAllPosts);
router
  .route("/:id")
  .put(auth, updatePost)
  .get(auth, getPost)
  .delete(auth, deletePost);

router.route("/like/:id").put(auth, likePost);
router.route("/unlike/:id").put(auth, unlikePost);
router.route("/comment/:id").post(auth, addComment);
router.route("/comment/:id/:comment_id").delete(auth, deleteComment);
router.route("/comment/like/:id/:comment_id").delete(auth, likeComment);
router.route("/comment/unlike/:id/:comment_id").delete(auth, unlikeComment);

export default router;
