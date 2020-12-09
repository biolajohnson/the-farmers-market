import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CLEAR_PROFILE,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";

//register user
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const { data } = await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    console.log(e);
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

//login user
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const data = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAILED,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: LOGOUT,
    });
  } catch (e) {
    console.log(e.message);
  }
};
