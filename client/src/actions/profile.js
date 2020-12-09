import {
  CLEAR_PROFILE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_REQUEST,
  GET_PROFILES_FAILED,
  GET_MY_PROFILE_FAILED,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILED,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_FAILED,
  DELETE_PROFILE_SUCCESS,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

// get a profile
export const getMyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "x-auth-token": userInfo.token,
      },
    };
    const { data } = await axios.get("/api/profile/me", config);
    dispatch({
      type: GET_MY_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: GET_MY_PROFILE_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
//get all farmer profiles
export const getProfiles = () => async (dispatch, getState) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: GET_PROFILES_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "x-auth-token": userInfo.token,
      },
    };
    const { data } = await axios.get("/api/profile", config);
    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: GET_PROFILES_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

// create or edit farmers profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CREATE_PROFILE_REQUEST,
  });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": userInfo.token,
      },
    };
    const { data } = await axios.post("/api/profile", formData, config);
    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch(setAlert(edit ? "Profile Edited" : "Profile Created", '"success'));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CREATE_PROFILE_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
//get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  dispatch({
    type: GET_PROFILE_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/profile/${userId}`);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e.message);
    dispatch({
      type: GET_PROFILE_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

//delete account
export const deleteAccount = () => async (dispatch) => {
  dispatch({ type: DELETE_PROFILE_REQUEST });
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_PROFILE_SUCCESS,
      });
      dispatch(setAlert("Your account has been deleted", "success"));
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: DELETE_PROFILE_FAILED,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  }
};
