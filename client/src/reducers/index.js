import { combineReducers } from "redux";
import { userRegisterReducer, userLoginReducer } from "./auth";
import alert from "./alert";
import {
  profileUpdateReducer,
  profileDeleteReducer,
  profileDetailsReducer,
  myProfileDetailsReducer,
  profilesListReducer,
  createProfileReducer,
} from "./profile";
import {
  createPostReducer,
  postDetailsReducer,
  addCommentReducer,
  addLikeReducer,
  postsListReducer,
  deletePostReducer,
  updatePostReducer,
} from "./post";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  profileDelete: profileDeleteReducer,
  myProfileDetails: myProfileDetailsReducer,
  profileDetails: profileDetailsReducer,
  profilesList: profilesListReducer,
  profileUpdate: profileUpdateReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
  createProfile: createProfileReducer,
  postsList: postsListReducer,
  postDetails: postDetailsReducer,
  createPost: createPostReducer,
  addComment: addCommentReducer,
  addLike: addLikeReducer,
  alert,
});

export default reducer;
