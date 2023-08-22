import React, { Component } from "react";
import Card from "react-bootstrap/Card";

interface ReviewProps {
  comment: string;
  rating: number;
}

class CardReview extends Component<ReviewProps> {
  render() {
    const fullStars = Math.floor(this.props.rating);
    const remainingStars = 5 - fullStars;

    return (
      <div className="container">
        <div className="col-6 mx-auto mt-4">
          <Card>
            <Card.Body>
              <Card.Title>{this.props.comment}</Card.Title>
              <Card.Subtitle>Rating: {this.props.rating}</Card.Subtitle>
              <div className="row">
                {[...Array(fullStars)].map((_, index) => (
                  <i key={index} className="fa fa-star"></i>
                ))}
                {[...Array(remainingStars)].map((_, index) => (
                  <i key={index + fullStars} className="fa fa-star-o"></i>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default CardReview;
