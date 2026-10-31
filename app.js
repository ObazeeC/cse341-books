import express from "express";
import router from "./src/router.js"


const app = express();

app.disable("etag") //If you don't want Express to return 304 responses: [cache -- not modified status]


app.use(express.json());
app.use(router);

// Add a root (GET /) that returns a short json response with a status code of 200
app.get("/", (rea, res) => {
   return  res.status(200).json({message: "Server is running"});
});

                                   
export default app;