import React from "react";

interface CardProps {
  title: string;
  authors: string[];
  thumbnail: string;
}

const Card: React.FC<CardProps> = ({ title, authors, thumbnail }) => {
  return (
    <div
      className="card text-center col-6 mx-auto mt-5"
      style={{ cursor: "pointer", height: "60vh" }}
    >
      <img
        src={thumbnail}
        className="card-img-top mx-auto"
        alt={title}
        style={{ height: "40vh", width: "80%", maxWidth: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Authors: {authors}</p>
      </div>
    </div>
  );
};

export default Card;
