import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { name, _id, avatar },
    firstname,
    lastname,
    location,
  },
}) => {
  return (
    <Fragment>
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="Avatar" />
        <div>
          <h2>{`${lastname}, ${firstname}`}</h2>
          <p>{name}</p>
          <p>{location}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>
        {/* skills or produce */}
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
