import axios from "axios";
import { Router, Request, Response } from "express";
import { GOOGLE_API_KEY } from "../config";
import Book from "../models/Book";

const router = Router();
const filterJsonData = (inputObj: any) => {
  const transformedDataArray = [];
  for (const element of inputObj.items) {
    const authorsArray = element.volumeInfo.authors || [];
    const concatenatedAuthors = authorsArray.join(", ");
    const description = element.volumeInfo.description || "";

    if (concatenatedAuthors !== "" && description !== "") {
      // Check if authors and description are not empty
      const thumbnail = element.volumeInfo.imageLinks?.thumbnail || "";

      if (thumbnail !== "") {
        // Check if thumbnail is not empty
        const transformedData = {
          title: element.volumeInfo.title || "",
          authors: concatenatedAuthors,
          thumbnail: thumbnail,
          description: description,
          pageCount: element.volumeInfo.pageCount || 0,
          language: element.volumeInfo.language || "",
        };
        transformedDataArray.push(transformedData);
      }
    }
  }
  return transformedDataArray;
};

router.get("/", async function (_req: Request, res: Response) {
  const listOfTopics = [
    "python",
    "javascript",
    "harrypotter",
    "thelordoftherings",
    "sci",
    "algebra",
    "flower",
    "dogstraining",
    "space",
    "nasa",
  ];
  let url_google_books = "";
  let cleanJson = [];
  try {
    for (const topic of listOfTopics) {
      url_google_books = `https://www.googleapis.com/books/v1/volumes?q=${topic}&key=${GOOGLE_API_KEY}`;
      let response = await axios.get(url_google_books);
      console.log("response", response.data);
      let cleanData = filterJsonData(response.data);
      cleanJson.push(cleanData);
    }
    const cleanBookData: Array<object> | any = cleanJson.flat();
    const createdBooks = await Book.bulkCreate(cleanBookData);
    console.log("created books:", createdBooks);
    return res.status(200).send({ data: cleanBookData });
  } catch (error) {
    console.log("error in list:", error);
  }
});

export default router;
