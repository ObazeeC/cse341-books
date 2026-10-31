import express from "express";


// import {getDb} from "./src/db/connect.js";

const app = express();

// Add a root (GET /) that returns a short json response with a status code of 200
app.use(express.json());

app.get("/", (rea, res) => {
   return  res.status(200).json({message: "Server is running"});
});

// ***  this is just to test practice database connection ****
/*
app.get("/trails", async (req, res) => {
    try{

        const trails = await getDb().collection("trails").find({}).toArray();
        return res.status(200).json(trails);

    }catch(error){
        console.error("Failed to retrieve trails:", error.message);
        return res.status(500).json({message: "Failed to retrieve trails"});
    }
});
*/                                    
export default app;