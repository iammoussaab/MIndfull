import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            MindfulLife Wellness Center is a cutting-edge platform devoted to fostering mental well-being
            through innovative solutions and empathetic support. Our team of experts is dedicated to providing
            personalized tools and resources to empower individuals on their journey to mental wellness.
            At MindfulLife, we prioritize your mental health, offering a holistic approach to support your emotional
            and psychological well-being. With MindfulLife, embark on a transformative path towards inner peace and balance.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
