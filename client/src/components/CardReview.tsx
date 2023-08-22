import React, { Component } from "react";
import Card from "react-bootstrap/Card";

interface ReviewProps {
  comment: string;
  rating: number;
}

class CardReview extends Component<ReviewProps> {
  render() {
    return (
      <div className="container">
        <div className="col-6 mx-auto mt-4">
          <Card>
            <Card.Body>
              <Card.Title>{this.props.comment}</Card.Title>
              <Card.Subtitle>Rating: {this.props.rating}</Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default CardReview;
