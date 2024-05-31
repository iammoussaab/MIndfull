import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 5,
      day: "we are open ",
      time: "24/7 ",
    }
    
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/Mindfull.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day} {element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>000-999-0000</span>
            </div>
            <div>
              <MdEmail />
              <span>zeelab@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Marrekech, Maroc </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
