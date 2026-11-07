# Books API Week 02 Spec 

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`

- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.
Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

success response body example:
{
  "id": "b3",
  "authorId": "a2",
  "title": "The Silent Horizon",
  "publicationDate": "2023-04-10"
}


#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

Success response body example:
{
  "id": "b3",
  "authorId": "a2",
  "title": "The Silent Horizon Revised",
  "publicationDate": "2024-01-01"
}


#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations





## Add an author collection that stores author ids, names, and birth years. Your API should provide all CRUD operations for this collection.

##Goal - Add an Authors API to manage author information. The API should support full CRUD operations for authors and store IDs, names, and birth years

### Data Model
Authors will be stored in the `author` collection.

Required book fields:
- `id`: string, required, custom id such as `a1`
- `authorId`: string, required, references the `a1` field of an author document
- `name`: string, required
- `birthYear`: string, required "2026-01-15"
    

  ### Routes

  GET /authors
  -Description: Return all authors
  -success status: `200`
  -Error status: 500
  -success response body example
  [
  {
    "id": "a1",
    "name": "Maya Rivera",
    "birthYear": 1985
  }
]

 GET /authors/:id
  -Description: Return one author by id
  -success status: `200`
  -Error status: 500
  -success response body example
  {
  "id": "a1",
  "name": "Maya Rivera",
  "birthYear": 1985
}

POST /authors
Description: Create a new author.
Success status: 201
Bad request status: 400
Error status: 500
Request body example: 
{
  "id": "a3",
  "name": "Sophia Bennett",
  "birthYear": 1990
}


PUT /authors/:id
Description: Update an existing author by id.
Success status: 200
Not found status: 404
Bad request status: 400
Error status: 500
Request body example:
{
  "name": "Sophia Bennett-Williams",
  "birthYear": 1990
}

DELETE /author/:id
Description: Delete an author by id:
success status: 204
Not found status: 404
Error status: 500 
Not found response body example:
{
  "message": "Author not found"
}