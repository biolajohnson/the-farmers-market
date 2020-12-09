import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";
import Spinner from "../Layout/Spinner";

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profilesList);
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Farmers</h1>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <p>No profiles here....</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
