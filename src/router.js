import express from "express";
import {    getBooksHandler, 
            getBookByIdHandler, 
            createBookHandler, 
            updateBookHandler, 
            deleteBookHandler,
            getauthorsHandler,
            getAuthorByIdHandler,
            createAuthorHandler,
            updateAuthorHandler,
            deleteAuthorHandler} from "./controllers/books.js";

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


/****
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book and stores it in the database. The authorid must reference an existing author in the authors collection
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorid
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b1
 *               authorid:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Node.js Fundamentals
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-01
 *     responses:
 *       201:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 authorid:
 *                   type: string
 *                 title:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/books", createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book by its ID. The authorid must reference an existing author in the authors collection
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorid:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Updated Node.js Fundamentals
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-01
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/books/:id", updateBookHandler);


/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the book to delete.
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/books/:id", deleteBookHandler);


/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Returns a list of all authors.
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6af0f8d1e3e462291176d9f9"
 *                   id:
 *                     type: string
 *                     example: "a1"
 *                   name:
 *                     type: string
 *                     example: "Chinua Achebe"
 *                   birthDate:
 *                     type: string
 *                     example: "1930-11-16"
 */
router.get("/authors", getauthorsHandler);


/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Returns a single author.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: a1
 *     responses:
 *       200:
 *         description: Author found.
 *       404:
 *         description: Author not found.
 */
 router.get("/authors/:id", getAuthorByIdHandler);


 /**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author.
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: a3
 *               name:
 *                 type: string
 *                 example: Sophia Bennett
 *               birthDate:
 *                 type: string
 *                 example: "1999-11-11"
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       400:
 *         description: Invalid author data.
 */
 router.post("/authors", createAuthorHandler);


 /**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author and adds it to the collection.
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: a3
 *               name:
 *                 type: string
 *                 example: Sophia Bennett
 *               BirthDate:
 *                 type: string
 *                 example: "1990"
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       400:
 *         description: Invalid author data.
 */
router.put("/authors/:id", updateAuthorHandler); 


/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author by its ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the author to delete.
 *         schema:
 *           type: string
 *           example: a1
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/authors/:id", deleteAuthorHandler);

export default router;
