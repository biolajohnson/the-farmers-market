import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "100px", display: "block", margin: "auto" }}
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Spinner;
