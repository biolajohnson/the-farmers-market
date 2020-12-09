import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../actions/profile";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, profile } = useSelector((state) => state.myProfileDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      dispatch(getMyProfile());
    }
  }, [dispatch, userInfo]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {userInfo ? (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">Welcome, {userInfo && userInfo.name}</p>
        </>
      ) : (
        <p>No user loaded</p>
      )}
      {profile !== null ? (
        <DashboardActions />
      ) : (
        <Fragment>
          <p>You have not set up a profile, use the button below to do that!</p>
          <Link to="/create-profile" className="btn btn-primary m-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
