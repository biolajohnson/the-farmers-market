import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile: { bio, skills, firstname } }) => {
  return (
    <Fragment>
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{`${firstname}'s Bio`}</h2>
        {bio && (
          <Fragment>
            <p>{bio}</p>
          </Fragment>
        )}
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          <div className="p-1">
            <i className="fa fa-check"></i> HTML
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> CSS
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> JavaScript
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> Python
          </div>
          <div className="p-1">
            <i className="fa fa-check"></i> C#
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
