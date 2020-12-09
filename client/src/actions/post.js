import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILED,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILED,
  POST_DETAILS_REQUEST,
  POST_DETAILS_FAILED,
  POST_DETAILS_SUCCESS,
  POSTS_LIST_SUCCESS,
  POSTS_LIST_REQUEST,
  POSTS_LIST_FAILED,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILED,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

//add post
export const addPost = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.post(
      "/api/post",
      {},
      {
        headers: {
          "Content-type": "application/json",
          "x-auth-token": userInfo.token,
        },
      }
    );
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: CREATE_POST_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    dispatch(setAlert(e.response.statusText, "danger"));
  }
};

//update post
export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.put(`/api/post/${post._id}`, post, {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": userInfo.token,
      },
    });
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: UPDATE_POST_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
    dispatch(setAlert(e.response.statusText, "danger"));
  }
};

//delete post
export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "x-auth-token": userInfo.token,
      },
    };
    await axios.delete(`/api/post/${id}`, config);
    dispatch({
      type: DELETE_POST_SUCCESS,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: DELETE_POST_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
//get post
export const getPost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "x-auth-token": userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/post/${postId}`, config);
    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POST_DETAILS_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

//get posts
export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "x-auth-token": userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/post`, config);
    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: POSTS_LIST_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
//add like
export const addLike = (id) => async (dispatch) => {
  dispatch({
    type: ADD_LIKE_REQUEST,
  });
  try {
    const { data } = await axios.put(`/api/post/like/${id}`);
    dispatch({
      type: ADD_LIKE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: ADD_LIKE_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
//remove like
// export const removeLike = (id) => async (dispatch) => {
//   try {
//     const res = await axios.put(`/api/post/unlike/${id}`);
//     dispatch({
//       type: UPDATE_LIKES,
//       payload: { id, likes: res.data },
//     });
//   } catch (e) {
//     console.log(e.message);
//     dispatch({
//       type: POST_ERROR,
//       payload:
//         e.response && e.response.data.message
//           ? e.response.data.message
//           : e.message,
//     });
//   }
// };
//add comment
export const addComment = (formData, id) => async (dispatch) => {
  dispatch({
    type: ADD_COMMENT_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/post/comment/${id}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: ADD_COMMENT_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

//delete comment
// export const removeComment = (postId, commentId) => async (dispatch) => {
//   try {
//     await axios.delete(`/api/post/comment/${postId}/${commentId}`);
//     dispatch({
//       type: REMOVE_COMMENT,
//       payload: commentId,
//     });
//     dispatch(setAlert("Comment Deleted", "success"));
//   } catch (e) {
//     console.log(e.message);
//     dispatch({
//       type: POST_ERROR,
//       payload:
//         e.response && e.response.data.message
//           ? e.response.data.message
//           : e.message,
//     });
//   }
// };
