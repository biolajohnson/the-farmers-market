import React from "react";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">The Farmers market</h1>
          <p className="lead">Connect directly to local farmers!</p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Lets go!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {};

export default Landing;
