import { getAllBooks,getBookById,createBook } from "../models/books.js";

// get all books

const getBooksHandler = async ( req, res)  => {
    try{
        const allbooks = await getAllBooks();
       return res.status(200).json(allbooks); 

    }catch(error){
     console.error("GET /books failed:", error.message);
     return res.status(500).json({Message: "Internal server error "});
    }
}

// get a single book by id 
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


// create or POST book 
const createBookHandler = async(req, res) => {
    try {
        const {id, authorid, title, publicationDate} = req.body;
        if(!id || !authorid || !title || !publicationDate){
            return res.status(400).json({message:"id, authorid, title and publication date are required"});
        }

        const newbook = {id, authorid, title, publicationDate};
        const book = await createBook(newbook);
        if(!book){
                return res.status(404).json({Message: "Invalid input"}) 
        }
        return res.status(201).json(book)
    } catch (error){
        return res.status(500).json({message: "Unable to create new book"});
       //return res.status(500).json({message: error.message}); --debugging
    }

}


export {getBooksHandler, getBookByIdHandler, createBookHandler}