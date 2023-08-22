import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { URL_ADD_REVIEW, URL_GET_REVIEWS } from "../assets/constants";
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
}

export default function BookDetails() {
  const actualBookUuid = useSelector(
    (state: RootState) => state.books.actualBookUuid
  );
  const catalog = useSelector((state: RootState) => state.books.catalog);
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
  });
  const [bookReviews, setBookReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Find the book in the catalog based on actualBookUuid
    const foundBook = catalog.find((book) => book.bookUuid === actualBookUuid);
    console.log(foundBook);
    // Update bookData state if the book is found
    if (foundBook) {
      setBookData(foundBook);
    }
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${URL_GET_REVIEWS}${actualBookUuid}`);
        setBookReviews(response.data.data); // Assuming the response.data is an array of reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [actualBookUuid, catalog]);

  const handleSubmitReview = async () => {};

  return (
    <div className="container bg-light">
      <div className="row mt-5">
        <div className="col-4">
          <img
            src={bookData.thumbnail}
            alt={bookData.title}
            style={{ width: "20vw", borderRadius: "10px" }}
          ></img>
          <div className="row mt-3">
            <div className="col-4">
              <h6>Page Numbers:</h6>
              <h6>Language:</h6>
            </div>
            <div className="col-4 offset-3">
              <p className="p-0 m-0">{bookData.pageCount}</p>
              <p>{bookData.language}</p>
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
      <div className="row mt-5 bg-primary">hi</div>
    </div>
  );
}
