import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Counseling Services",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Psychiatry",
      imageUrl: "/departments/psychiatry.png",
    },
    {
      name: "Support Groups",
      imageUrl: "/departments/support group.jpeg",
    },
    {
      name: "Family Therapy",
      imageUrl: "/departments/family therapy.jpeg",
    },
    {
      name: "Wellness Programs",
      imageUrl: "/departments/willness program.jpeg",
    },
    {
      name: "Educational Resources",
      imageUrl: "/departments/educational-resources.jpg",
    },
    {
      name: "Peer Support",
      imageUrl: "/departments/peer suppor.png",
    },
    {
      name: "Crisis Intervention",
      imageUrl: "/departments/crisis intervention.jpeg",
    },
    {
      name: "Substance Abuse Treatment",
      imageUrl: "/departments/substance abuse.jpeg",
    },
    {
      name: "Online Therapy",
      imageUrl: "/departments/online health.jpeg",
    },
    {
      name: "Telehealth Services",
      imageUrl: "/departments/telehealth.jpeg",
    },
    {
      name: "Mental Health Assessments",
      imageUrl: "/departments/assessements.jpeg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            // "superLargeDesktop",
            // "desktop",
            "tablet",
            "mobile",
          ]}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div>
                  <img src={depart.imageUrl} alt="Department" />
                </div>
                <div>
                  <div className="depart-name">{depart.name}</div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
