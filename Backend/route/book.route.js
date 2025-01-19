import express from "express";
import { getBookById, getBook, addBook, updateBook, deleteBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/books/:id", getBookById);
router.post("/add", addBook);
router.put("/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;