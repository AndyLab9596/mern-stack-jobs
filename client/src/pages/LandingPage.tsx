import React from "react";
import Logo from "../components/Logo";
import Wrapper from "../styles/LandingPage.style";
import LandingImg from "../assets/images/main.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={LandingImg} className="img main-img" alt="main" />
      </div>
    </Wrapper>
  );
};

export default LandingPage;
