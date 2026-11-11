import { getAllBooks,getBookById,createBook,updatebook, deleteBook,
         getAllauthors,getAuthorById,createAuthor,updateAuthor, deleteAuthor, getIdAuthorCollection
        } from "../models/books.js";

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


// create or POST book*/ 
const createBookHandler = async (req, res) => {
  try {
    const { id, authorid, title, publicationDate } = req.body;

    // Validate required fields
    if (!id || !authorid || !title || !publicationDate) {
      return res.status(400).json({
        message:
          "id, authorid, title, and publicationDate are required"
      });
    }

    // Check for duplicate book id
    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: "Book id already exists"
      });
    }

    // Check that author exists
    const author = await getAuthorById(authorid);

    if (!author) {
      return res.status(400).json({
        message: "Invalid authorid. Author does not exist"
      });
    }

    const newBook = {
      id,
      authorid,
      title,
      publicationDate
    };

    const result = await createBook(newBook);

    if (!result.acknowledged) {
      return res.status(500).json({
        message: "Failed to create book"
      });
    }

    // Return the created book object per spec
    return res.status(201).json(newBook);

  } catch (error) {
    return res.status(500).json({message: "Unable to create new book"})
  }
};



// Update or PUT book
const updateBookHandler = async(req, res)=>{
    try{
        const {id} = req.params;
        const {authorid, title, publicationDate} = req.body;

        if(!authorid || !title || !publicationDate){
            return res.status(400).json({message: "authorid, title and publication date are required"});
        }

        // check if author exists
        const author = await getAuthorById(authorid); 
        if(!author){ 
            return res.status(400).json({message:"Invalid authorid. Author does not exist"});
        }
        
        const updatedBook = {authorid, title, publicationDate};
        const result = await updatebook(id, updatedBook)

        if(result.matchedCount === 0){
            return res.status(400).json({  message: "Book not found"});
        }
        return res.status(200).json({message: "Book updated successfully"})
    } catch(error){
           return res.status(500).json({message: "Unable to update record"});
         
    }
}

// delete book handler
const deleteBookHandler = async(req, res) => {
    try{
     const{id} = req.params;

     const result = await deleteBook(id);

     if(result.deletedCount === 0){
        return res.status(400).json({  message: "Book not found"});
     };

     return res.status(200).json({message: "Book deleted successfully"});
    }catch(error){
        return res.status(500).json({message: "Unable to delete record"});
    }
}


// authors

//all authors
const getauthorsHandler = async ( req, res)  => {
    try{
        const authors = await getAllauthors();
       return res.status(200).json(authors); 

    }catch(error){
     console.error("GET /books failed:", error.message);
     return res.status(500).json({Message: "Internal server error "});
    }
}

// author by id
// get a single author
const getAuthorByIdHandler = async(req, res) =>{
    const requestedId = req.params.id;
    try{
      const author = await getAuthorById(requestedId);
      if(!author){
        return res.status(404).json({Message: "Author not found"})
      }
      return res.status(200).json(author);

    }catch(error){
        console.error("Get /authors/id failed: ", error.message);
        return res.status(500).json({Message: "Internal server error"})
    }

}


// create or POST book 
const createAuthorHandler = async(req, res) => {
    try {
        const {id, name, birthDate} = req.body;
        if(!id || !name || !birthDate){
            return res.status(400).json({message:"id, name and birth date are required"});
        }

        // check if author exists
        const author = await getAuthorById(id);
        
        if(author){
            return res.status(400).json({message:"Invalid authorid. Author already exist"});
        }
        const authorC = {id, name, birthDate};
        const newAuthor = await createAuthor(authorC);
        if(!newAuthor){
                return res.status(404).json({Message: "Invalid input"}) 
        }
        return res.status(201).json(newAuthor)
    } catch (error){
       // return res.status(500).json({message: "Unable to create new author"});
       return res.status(500).json({message: error.message}); --debugging
    }

}

// Update or PUT book
const updateAuthorHandler = async(req, res)=>{
    try{
        const {paramid} = req.params;
        const {id, name, birthDate} = req.body;


        if(!id || !name || !birthDate){
            return res.status(400).json({message: "id, name and birth date are required"});
        }

        // check if author exists
        const author = await getIdAuthorCollection(id); 
        if(!author){
            return res.status(400).json({message:"Invalid authorid. Author does not exist"});
        }
        
        const updatedAuthor = {id, name, birthDate};
        const result = await updateAuthor(paramid, updatedAuthor)

        if(result.matchedCount === 0){
            return res.status(400).json({  message: "Author not found"});
        }
        return res.status(200).json({message: "Author updated successfully"})
    } catch(error){
           return res.status(500).json({message: "Unable to update record"});
    }
}

// delete book handler
const deleteAuthorHandler = async(req, res) => {
    try{
     const{id} = req.params;

     const result = await deleteAuthor(id);

     if(result.deletedCount === 0){
        return res.status(400).json({  message: "Author not found"});
     };

     return res.status(200).json({message: "Author deleted successfully"});
    }catch(error){
        return res.status(500).json({message: "Unable to delete record"});
    }
}



export {getBooksHandler, getBookByIdHandler, createBookHandler,updateBookHandler, 
        deleteBookHandler,getauthorsHandler,getAuthorByIdHandler, createAuthorHandler,
        updateAuthorHandler,deleteAuthorHandler}