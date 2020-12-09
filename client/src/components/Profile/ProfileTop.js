import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    lastname,
    firstname,
    location,
    user: { avatar },
  },
}) => {
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
        <img className="round-img my-1" src={avatar} alt="" />
        <h1 className="large">{`${lastname}, ${firstname}`}</h1>
        <p>{location}</p>
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
