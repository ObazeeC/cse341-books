import { getAllBooks,getBookById } from "../models/books.js";

const getBooksHandler = async ( req, res)  => {
    try{
        const allbooks = await getAllBooks();
       return res.status(200).json(allbooks); 

    }catch(error){
     console.error("GET /books failed:", error.message);
     return res.status(500).json({Message: "Internal server error "});
    }
}

const getBookByIdHandler = async(req, res) =>{
    const requestedId = req.params.id;
    try{
      const book = await getBookById(requestedId);
      if(!book){
        return res.status(404).json({Message: "Book not found"})
      }
      return res.status(200).json(book);

    }catch(error){
        console.error("Get /books/id failed: ", error.message);
        return res.status(500).json({Message: "Internal server error"})
    }

}

export {getBooksHandler, getBookByIdHandler}