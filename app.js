import express from "express";

const app = express();

// Add a root (GET /) that returns a short json response with a status code of 200
app.use(express.json());

app.get("/", (rea, res) => {
   return  res.status(200).json({message: "Server is running"});
});



export default app;