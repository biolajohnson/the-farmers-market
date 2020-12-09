import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, getMyProfile } from "../../actions/profile";

const EditProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.myProfileDetails);
  const { success } = useSelector((state) => state.profileUpdate);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    location: "",
    bio: "",
  });
  const { firstname, lastname, location, bio } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (profile) {
    console.log("theres a profile now ");
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, true));
  };
  useEffect(() => {
    if (!profile) {
      dispatch(getMyProfile());
    }

    setFormData({
      location: profile ? profile.location : "",
      firstname: profile ? profile.firstname : "",
      lastname: profile ? profile.lastname : "",
      bio: profile ? profile.bio : "",
    });
    if (success) {
      history.push("/dashboard");
    }
  }, [loading, success, history, dispatch, profile, setFormData]);
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        get some information to make your profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={firstname}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">First Name</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={lastname}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Last Name</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            name="location"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (e.g. Ikeja, Lagos)
          </small>
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default EditProfile;
