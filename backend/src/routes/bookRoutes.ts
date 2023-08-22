import axios from "axios";
import { Router, Request, Response } from "express";
import { GOOGLE_API_KEY } from "../config";
import Book from "../models/Book";
import { Op } from "sequelize";

const router = Router();
const filterJsonData = (inputObj: any) => {
  const transformedDataArray = [];
  for (const element of inputObj.items) {
    const authorsArray = element.volumeInfo.authors || [];
    const categoriesArray = element.volumeInfo.categories || [];
    const concatenatedAuthors = authorsArray.join(", ");
    const concatenatedCategories = categoriesArray.join(", ");
    const description = element.volumeInfo.description || "";

    if (
      concatenatedAuthors !== "" &&
      description !== "" &&
      concatenatedCategories !== ""
    ) {
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
          category: concatenatedCategories,
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
    "starswars",
    "aliens",
  ];
  let url_google_books = "";
  let cleanJson = [];
  try {
    const existingBooks = await Book.findAll();

    if (existingBooks.length > 0) {
      // Data already exists, return the existing data
      return res
        .status(200)
        .send({ data: existingBooks, message: "Data already existed" });
    }
    for (const topic of listOfTopics) {
      url_google_books = `https://www.googleapis.com/books/v1/volumes?q=${topic}&key=${GOOGLE_API_KEY}`;
      let response = await axios.get(url_google_books);
      let cleanData = filterJsonData(response.data);
      cleanJson.push(cleanData);
    }
    const cleanBookData: Array<object> | any = cleanJson.flat();
    const createdBooks = await Book.bulkCreate(cleanBookData);

    return res.status(200).send({ data: createdBooks });
  } catch (error) {
    console.log("error in list:", error);
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.query; // The search query string

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid search query" });
    }

    // Search for books with titles, authors, or categories containing the query
    const searchResults = await Book.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${query}%`, // Case-insensitive partial match
            },
          },
          {
            authors: {
              [Op.iLike]: `%${query}%`, // Case-insensitive partial match
            },
          },
          {
            category: {
              [Op.iLike]: `%${query}%`, // Case-insensitive partial match
            },
          },
        ],
      },
    });

    return res.status(200).json({ data: searchResults });
  } catch (error) {
    console.error("Error searching:", error);
    return res.status(500).json({ error: "An error occurred while searching" });
  }
});

export default router;
