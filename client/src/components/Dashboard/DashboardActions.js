import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = (props) => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
