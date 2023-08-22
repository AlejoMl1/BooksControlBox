import React from "react";

interface CardProps {
  title: string;
  authors: string[];
  thumbnail: string;
  category: string; // Add the category prop
}

const Card: React.FC<CardProps> = ({ title, authors, thumbnail, category }) => {
  return (
    <div
      className="card text-center col-6 mx-auto my-3 main-card"
      style={{ cursor: "pointer", height: "55vh" }}
    >
      <img
        src={thumbnail}
        className="card-img-top mx-auto "
        alt={title}
        style={{ height: "30vh", width: "86%", maxWidth: "100%" }}
      />
      <div className="card-body p-1 mt-3" style={{ overflowY: "hidden" }}>
        <h6 className="card-title">{title}</h6>
        <p className="card-text mt-2" style={{ color: "rgb(35, 35, 89)" }}>
          Authors: {authors}
        </p>
        <p className="card-text mt-2" style={{ color: "rgb(79, 135, 181)" }}>
          Category: {category} {/* Display the category */}
        </p>
      </div>
    </div>
  );
};

export default Card;
