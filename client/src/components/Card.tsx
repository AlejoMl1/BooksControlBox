import React from "react";

interface CardProps {
  title: string;
  authors: string[];
  imageLink: string;
}

const Card: React.FC<CardProps> = ({ title, authors, imageLink }) => {
  return (
    <div className="card text-center col-6 mx-auto" >
      <img
        src={imageLink}
        className="card-img-top mx-auto"
        alt={title}
        style={{height: "90%" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          Authors: {authors.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Card;
