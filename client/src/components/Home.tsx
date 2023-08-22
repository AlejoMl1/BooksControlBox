import React,{useState} from "react";
import './Home.css';
import axios from "axios";
import Card from "./Card";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { URL_GET_SEARCH_BY_TITLE } from "../assets/constants";
export default function Home() {
  const username = useSelector((state: RootState) => state.user.username);
  const catalog = useSelector((state: RootState) => state.books.catalog);
  const [search,setSearch]= useState("");
  const searchBook = async (search: string)=>{
    console.log("enter the search function, the value is:",search);
    const response = await axios.get(`${URL_GET_SEARCH_BY_TITLE}${search}`);
    console.log("response in home",response.data);
  }

   const cardsInfo= [
    {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=PExOEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
  },
   {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=PO14EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  },
     {
    title: "De cero al infinito. Aprende a programar en Python",
    authors: ["Author 1", "Author 2"],
    imageLink: "http://books.google.com/books/content?id=6unYzQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
  }
   ]
  return ( 
  <div className="container-fluid">
    {username ? (<>
    
     <div id="title" className="center">
        <div className="row pt-5 col-lg-6 col-md-9 col-sm-10 mx-auto">
          <div id="input" className="input-group mx-auto">
            <input 
            id="search-box" 
            type="text" 
            className="form-control" 
            placeholder="Search Books!..." 
            value={search}
            onChange={(event) => setSearch(event.target.value)} 
            />
            <button id="search" className="btn btn-primary" onClick={()=>searchBook(search)}>Search</button>
          </div>
        </div>
      </div>
   <div className="book-list mt-4 mb-5">
        <h3 className="text-center">Search Result</h3>
        <div id="list-output" className="row g-2 mt-3">
          {cardsInfo.map((card, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mt-4" >
              <Card {...card} />
            </div>
          ))}
        </div>
      </div>
    
    </>):<>  
     <div id="title" className="center text-center mt-5">
      <h2>Please Log in or Sign Up to view the catalog of books</h2>
    </div>
      </>

  
  }
     
    </div>
  );
    
}
