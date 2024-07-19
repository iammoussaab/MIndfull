import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          {/* <p>Biography</p> */}
          <h3>Who We Are</h3>
          <p>
            We're a team passionate about technology and its transformative
            potential. In 2024, we're focused on a MERN STACK PROJECT, driven by
            innovation and a commitment to excellence.
          </p>
          <p>
            Fueled by innovation and a drive to challenge limits, we strive to
            push boundaries and redefine possibilities. Join us on our journey
            as we code, create, and innovate together!
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
