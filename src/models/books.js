import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection("books");
  const books = await collection.find({}).toArray();
  return books;
  
  //*** * do everything with one line of code ***
  //  return await getDb().collection("books").find({}).toArray();
 
}

const getBookById = async(bookId) =>{
    return await getDb().collection("books").findOne({id:bookId});
}


//create one boock
const createBook = async(book) => {
  return await getDb().collection("books").insertOne(book)
}

// update a book
const updatebook = async(bookid, updatedBook) => {
  return await getDb().collection("books").updateOne(
    {id:bookid},
    {$set:updatedBook}
  );
};

// delete a book
const deleteBook = async(bookid) =>{
  return await getDb().collection("books").deleteOne({id:bookid});
};

// getAuthorId
const getAuthorId = async(authorId) =>{
  return await getDb().collection("books").findOne({id:authorId});
}


// AUTHORS
/*
const getIdAuthorCollection = async(authorId) =>{
  return await getDb().collection("authors").findOne({id:authorId});
}*/

// all author
const getAllauthors = async () => {
  const db = getDb();
  const collection = db.collection("authors");
  const authors = await collection.find({}).toArray();
  return authors;
}

// author by id
const getAuthorById = async(authorId) =>{
    return await getDb().collection("authors").findOne({id:authorId});
}

//create one author
const createAuthor = async(author) => {
  return await getDb().collection("authors").insertOne(author)
}

// update a book
const updateAuthor = async(authorid, updatedAuthor) => {
  return await getDb().collection("authors").updateOne(
    {id:authorid},
    {$set:updatedAuthor}
  );
};

const deleteAuthor = async(Authorid) =>{
  return await getDb().collection("authors").deleteOne({id:Authorid});
};

export {getAllBooks, getBookById, createBook, updatebook, deleteBook,
        getAuthorId,getAllauthors,getAuthorById, createAuthor, updateAuthor,
         deleteAuthor};