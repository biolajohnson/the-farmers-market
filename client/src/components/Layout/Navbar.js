import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.userLogin);
  const logoutHandler = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li>
        <a onClick={logoutHandler} href="/login">
          Logout
        </a>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/profiles">Farmers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Farmers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">The Farmers Market</Link>
        </h1>
        {!loading && <Fragment>{userInfo ? authLinks : guestLinks}</Fragment>}
      </nav>
    </Fragment>
  );
};

export default Navbar;
