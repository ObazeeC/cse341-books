import app from "./app.js";

// use port from .env or default to 3000
const port = process.env.PORT || 3000;

if(!port){
    throw new Error(" Port is not defined. Make sure you local npm scripts reference the .env file")
}
// start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})