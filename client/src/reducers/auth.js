import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
} from "../actions/types";

export const userLoginReducer = (
  state = { userInfo: null },
  { payload, type }
) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
