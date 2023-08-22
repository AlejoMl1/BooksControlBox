import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Card from "./Card"; // Import the BookDetailsWithReviews component
import { useSelector ,useDispatch} from 'react-redux';
import { RootState } from "../redux/store";
import { URL_GET_SEARCH_BY_TITLE } from "../assets/constants";
import { setBookUuid } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.user.username);
  const catalog = useSelector((state: RootState) => state.books.catalog);
  const actualBookUuid = useSelector((state: RootState) => state.books.actualBookUuid);
  const [search, setSearch] = useState("");
  const [filteredCatalog, setFilteredCatalog] = useState(catalog);


  const searchBook = async (search: string) => {
    if (search === "") {
      setFilteredCatalog(catalog);
    } else {
      const response = await axios.get(`${URL_GET_SEARCH_BY_TITLE}${search}`);
      setFilteredCatalog(response.data.data);
    }
  };

  const handleClickedBook = (bookUuid:any)=> {
        dispatch(setBookUuid(bookUuid));
      navigate("/bookDetails");
  };

  return (
    <div className="container-fluid">
      {username ? (
        <>
          <div id="title" className="center">
            <div className="row pt-5 col-lg-6 col-md-9 col-sm-10 mx-auto">
              <div id="input" className="input-group mx-auto">
                <input
                  id="search-box"
                  type="text"
                  className="form-control"
                  placeholder="Search Books!..."
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    searchBook(event.target.value);
                  }}
                />
                <button
                  id="search"
                  className="btn btn-primary"
                  onClick={() => searchBook(search)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="book-list mt-4 mb-5">
            <h3 className="text-center">
              {search ? "Search Result" : "Catalog"}
            </h3>
            <div id="list-output" className="row g-2 mt-3">
              {filteredCatalog.map((book) => (
                <div
                  key={book.bookUuid}
                  className="col-12 col-md-6 col-lg-4 mt-4"
                  onClick={()=>handleClickedBook(book.bookUuid) }
                  style={{ cursor: "pointer" }}
                >
                  <Card {...book} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div id="title" className="center text-center mt-5">
            <h2>Please Log in or Sign Up to view the catalog of books</h2>
          </div>
        </>
      )}
    </div>
  );
}
