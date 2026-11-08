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

export {getAllBooks, getBookById, createBook, updatebook, deleteBook};