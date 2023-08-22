import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { URL_ADD_REVIEW, URL_GET_REVIEWS } from "../assets/constants";
import CardReview from "./CardReview";
import axios from "axios";

interface Review {
  reviewUuid: string;
  userUuid: string;
  bookUuid: string;
  rating: number;
  reviewText: string;
}

interface Book {
  bookUuid: string;
  title: string;
  authors: string;
  thumbnail: string;
  description: string;
  pageCount: number;
  language: string;
  reviews: Review[];
  category: string;
}

export default function BookDetails() {
  const actualBookUuid = useSelector(
    (state: RootState) => state.books.actualBookUuid
  );
  const catalog = useSelector((state: RootState) => state.books.catalog);
  const userUuid = useSelector((state: RootState) => state.user.userUuid);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [bookData, setBookData] = useState<Book>({
    bookUuid: "",
    title: "",
    authors: "",
    thumbnail: "",
    description: "",
    pageCount: 0,
    language: "",
    reviews: [],
    category: "",
  });
  const [bookReviews, setBookReviews] = useState<Review[]>([]);
  const averageRating = () => {
    if (bookReviews.length === 0) {
      return 0;
    }
    const sum = bookReviews.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    );
    const average = sum / bookReviews.length;

    return average;
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${URL_GET_REVIEWS}${actualBookUuid}`);
      console.log("response in bookdetail for getReview", response);

      setBookReviews(response.data.data); // Assuming the response.data is an array of reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    // Find the book in the catalog based on actualBookUuid
    const foundBook = catalog.find((book) => book.bookUuid === actualBookUuid);
    console.log(foundBook);
    // Update bookData state if the book is found
    if (foundBook) {
      setBookData(foundBook);
    }

    console.log("bookReviews", bookReviews);
    fetchReviews();
  }, [actualBookUuid, catalog]);

  const handleSubmitReview = async () => {
    const requestBody = {
      userUuid,
      bookUuid: actualBookUuid,
      rating,
      reviewText,
    };

    await axios.post(URL_ADD_REVIEW, requestBody);
    fetchReviews();
  };

  return (
    <div className="container ">
      <div className="row mt-5 bg-light">
        <div className="col-4">
          <img
            src={bookData.thumbnail}
            alt={bookData.title}
            style={{ width: "20vw", borderRadius: "10px" }}
          ></img>
          <div className="row mt-3">
            <div className="col-4">
              <h6>Category:</h6>
              <h6>Page Numbers:</h6>
              <h6>Language:</h6>
            </div>
            <div className="col-4 offset-2">
              <p className="p-0 m-0">{bookData.category}</p>
              <p className="p-0 m-0">{bookData.pageCount}</p>
              <p className="p-0 m-0">{bookData.language}</p>
            </div>
          </div>
        </div>
        <div className="col-8 bg-light">
          <div className="row">
            <h2>{bookData.title}</h2>
            <div className="row">
              <div className="col-2 mt-4" style={{ color: "rgb(35, 35, 89)" }}>
                <h5>Authors:</h5>
                <h5 className="mt-4">Description:</h5>
              </div>
              <div className="col-8 mt-4">
                <h5>{bookData.authors}</h5>
              </div>
            </div>

            <p className=""></p>
          </div>
          <div className="row" style={{ height: "50vh", overflowY: "scroll" }}>
            <p className="text-justify">{bookData.description}</p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4">
          <h3>Reviews:</h3>
          <div className="row">
            <h5 className="col mt-3" style={{ color: "rgb(35, 35, 89)" }}>
              Average Review:{" "}
              <span style={{ color: "red" }}>{averageRating().toFixed(1)}</span>
            </h5>
          </div>
        </div>

        <div className="col ">
          {bookReviews.length > 0 ? (
            bookReviews.map((review) => (
              <CardReview
                key={review.reviewUuid}
                comment={review.reviewText}
                rating={review.rating}
              />
            ))
          ) : (
            <div className="col-12 text-info mx-auto text-center">
              <h4 className="text-info mx-auto">
                This book doesn't have any reviews , be the first one to post!
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="row mt-3 ">
        <div className="col-8">
          <h5 className="my-4">Post your review:</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Your review..."
            style={{ height: "10vh" }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div className="col-2">
          <h5 className="my-4">Choose your rating:</h5>
          <form>
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center my-5">
          <button onClick={handleSubmitReview} className="btn btn-primary">
            Send Review
          </button>
        </div>
      </div>
    </div>
  );
}
