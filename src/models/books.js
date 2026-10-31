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

export {getAllBooks, getBookById};