import axios from "axios";
import { Router, Request, Response } from "express";
import { GOOGLE_API_KEY } from "../config";
const router = Router();

const filterJsonData = (inputObj: any) => {
  const transformedDataArray = [];
  for (const element of inputObj.items) {
    const authorsArray = element.volumeInfo.authors || []; // If authors is undefined, set an empty array
    const concatenatedAuthors = authorsArray.join(", ");
    const transformedData = {
      title: element.volumeInfo.title || "",
      authors: concatenatedAuthors,
      thumbnail: element.volumeInfo.imageLinks?.thumbnail || "",
      sthumbnail: element.volumeInfo.imageLinks?.smallthumbnail || "",
      description: element.volumeInfo.description || "",
      pageCount: element.volumeInfo.pageCount || 0,
      language: element.volumeInfo.language || "",
      //   searchInfo: element.searchInfo.textSnippet || "",
    };
    transformedDataArray.push(transformedData);
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
    "science",
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
    const flattenedJson = cleanJson.flat();
    return res.status(200).send({ data: flattenedJson });
  } catch (error) {
    console.log("error in list:", error);
  }
});

export default router;
