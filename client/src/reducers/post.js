import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_LIKE_FAILED,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  CREATE_POST_FAILED,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILED,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  POSTS_LIST_FAILED,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POST_DETAILS_FAILED,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  UPDATE_POST_FAILED,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from "../actions/types";

export const postDetailsReducer = (state = { post: {} }, { type, payload }) => {
  switch (type) {
    case POST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: payload,
      };
    case POST_DETAILS_FAILED:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createPostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        post: payload,
        success: true,
      };
    case CREATE_POST_FAILED:
      return {
        loading: false,
        error: payload,
      };
    case CREATE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case DELETE_POST_REQUEST:
      return {
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_POST_FAILED:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const updatePostReducer = (state = { post: {} }, { type, payload }) => {
  switch (type) {
    case UPDATE_POST_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        post: payload,
      };
    case UPDATE_POST_FAILED:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const addCommentReducer = (state = { post: {} }, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        comments: payload,
      };
    case ADD_COMMENT_FAILED:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const addLikeReducer = (state = { post: {} }, { type, payload }) => {
  switch (type) {
    case ADD_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        likes: payload,
      };
    case ADD_LIKE_FAILED:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const postsListReducer = (state = { posts: [] }, { type, payload }) => {
  switch (type) {
    case POSTS_LIST_REQUEST:
      return {
        loading: true,
      };
    case POSTS_LIST_SUCCESS:
      return {
        loading: false,
        posts: payload,
      };
    case POSTS_LIST_FAILED:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

// export default function (state = initialState, { type, payload }) {
//   switch (type) {
//     case GET_POST:
//       return {
//         ...state,
//         post: payload,
//         loading: false,
//       };
//     case GET_POSTS:
//       return {
//         ...state,
//         posts: payload,
//         loading: false,
//       };
//     case ADD_POST:
//       return {
//         ...state,
//         successAdd: true,
//         post: payload,
//         loading: false,
//       };
//     case UPDATE_LIKES:
//       return {
//         ...state,
//         posts: state.posts.map((post) =>
//           post._id === payload.id ? { ...post, likes: payload.likes } : post
//         ),
//         loading: false,
//       };
//     case DELETE_POST:
//       return {
//         ...state,
//         posts: state.posts.filter((post) => post._id !== payload),
//         loading: false,
//       };
//     case ADD_COMMENT:
//       return {
//         ...state,
//         post: { ...state.post, comments: payload },
//         loading: false,
//       };
//     case REMOVE_COMMENT:
//       return {
//         ...state,
//         post: {
//           ...state.post,
//           comments: state.post.comments.filter(
//             (comment) => comment._id !== payload
//           ),
//         },
//         loading: false,
//       };
//     case POST_ERROR:
//       return {
//         ...state,
//         error: payload,
//         loading: false,
//       };
//     case UPDATE_POST:
//       return {
//         ...state,
//         posts: [payload, ...state.posts],
//         loading: false,
//         successUpdate: true,
//       };
//     case UPDATE_POST_RESET:
//       return {
//         ...state,
//         post: {},
//       };
//     default:
//       return state;
//   }
// }
