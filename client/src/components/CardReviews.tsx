import React, { Component } from "react";
import Card from "react-bootstrap/Card";

interface ReviewProps {
  comment: string;
  rating: number;
}

class Review extends Component<ReviewProps> {
  render() {
    const stars = Array(this.props.rating).fill("fa-star");

    return (
      <div className="contain">
        <Card>
          <Card.Body>
            <Card.Title>{this.props.comment}</Card.Title>
            <Card.Subtitle>Rating: {this.props.rating}</Card.Subtitle>
            <div className="row">
              {stars.map((star, index) => (
                <i key={index} className="fa fa-star"></i>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Review;
