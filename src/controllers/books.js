import { getAllBooks } from "../models/books.js";

const getBooksHandler = async ( req, res)  => {
    try{
        const allbooks = await getAllBooks();
       return res.status(200).json(allbooks); 

    }catch(error){
     console.error("GET /books failed:", error.message);
     return res.status(500).json({Message: "Internal server error "});
    }
}

export {getBooksHandler}