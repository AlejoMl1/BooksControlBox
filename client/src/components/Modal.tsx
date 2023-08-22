import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { URL_ADD_REVIEW } from "../assets/constants";
import axios from "axios";

interface Book {
  bookUuid: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
  pageCount: number;
  language: string;
}

interface Props {
  book: Book;
  onClose: () => void;
}

export default function BookDetailsModal({ book, onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const userUuid = useSelector((state: RootState) => state.user.userUuid);

  const dispatch = useDispatch();

  const handleSubmitReview = async () => {
    if (rating > 0) {
      try {
        const response = await axios.post(URL_ADD_REVIEW, {
          userUuid,
          bookUuid: book.bookUuid,
          rating,
          reviewText,
        });

        // Dispatch an action to update the state with the new review
        // dispatch(someActionToUpdateReviewState(response.data.review));

        onClose(); // Close the modal or perform other actions as needed
      } catch (error) {
        console.error("Error adding review:", error);
      }
    } else {
      // Handle the case when the user didn't provide a rating
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog" >
        <div className="modal-content mx-auto">
          <div className="modal-header">
            <h5 className="modal-title mx-auto">{book.title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ width: "100%" }} className="p-3">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
                />
              </div>
              <div style={{ maxWidth: "60%", overflowY: "auto", maxHeight: "300px",overflowX: "hidden" }}>
                {/* <h4>{book.title}</h4>
                 <p>Author: {book.authors}</p> */}
                <div className="description-scroll">
                  <p>{book.description}</p>
                </div>
                <p>Page Count: {book.pageCount}</p>
                <p>Language: {book.language}</p>
              </div>
            </div>
            <div>
              <p>Rating:</p>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={star}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reviewText">Review Text:</label>
              <textarea
                className="form-control"
                rows={3}
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
