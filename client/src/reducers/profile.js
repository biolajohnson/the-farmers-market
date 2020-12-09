import {
  GET_PROFILES_REQUEST,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAILED,
  CLEAR_PROFILE,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from "../actions/types";

export const profilesListReducer = (
  state = { profiles: [] },
  { type, payload }
) => {
  switch (type) {
    case GET_PROFILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_PROFILES_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const profileDetailsReducer = (
  state = { profile: {} },
  { type, payload }
) => {
  switch (type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        profile: payload,
        loading: false,
      };
    case GET_PROFILE_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const myProfileDetailsReducer = (
  state = { profile: null },
  { type, payload }
) => {
  switch (type) {
    case GET_MY_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_PROFILE_SUCCESS:
      return {
        profile: payload,
        loading: false,
      };
    case GET_MY_PROFILE_FAILED:
      return {
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        profile: {},
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};

export const profileDeleteReducer = (
  state = { profile: {} },
  { type, payload }
) => {
  switch (type) {
    case DELETE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        success: true,
        loading: false,
      };
    case DELETE_PROFILE_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const profileUpdateReducer = (
  state = { profile: {} },
  { type, payload }
) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        profile: payload,
        loading: false,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const createProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        profile: payload,
        loading: false,
      };
    case UPDATE_PROFILE_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
