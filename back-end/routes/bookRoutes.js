import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send("Bad request");
      return;
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//update route
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Bad request");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, res.body);
    if (!result) {
      return res.status(404).send("Boook not found");
    }
    res.status(200).send("Book updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//delete route
router.delete("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Bad request");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id, res.body);
    if (!result) {
      return res.status(404).send("Boook not found");
    }
    res.status(200).send("Book deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
