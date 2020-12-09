import React, { Fragment, useEffect, useState } from "react";
import { setAlert } from "../../actions/alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [history, userInfo]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">Create Your Account</p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;