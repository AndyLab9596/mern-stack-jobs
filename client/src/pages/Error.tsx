import React from "react";
import ErrorWrapper from "../styles/ErrorPage.style";
import error404 from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <ErrorWrapper>
      <div>
        <img src={error404} alt="not-found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/register">Back Home</Link>
      </div>
    </ErrorWrapper>
  );
};

export default Error;
