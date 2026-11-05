import express from "express";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";

const router  = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     description: Returns a list of all available books.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books was retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: b1
 *                   title:
 *                     type: string
 *                     example: The Great Gatsby
 *                   author:
 *                     type: string
 *                     example: F. Scott Fitzgerald
 *       500:
 *         description: Internal server error.
 */
router.get("/books", getBooksHandler);


/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Returns a single book matching the provided ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to retrieve.
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       200:
 *         description: Book retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b1
 *                 title:
 *                   type: string
 *                   example: The Great Gatsby
 *                 author:
 *                   type: string
 *                   example: F. Scott Fitzgerald
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/books/:id", getBookByIdHandler)

export default router;
