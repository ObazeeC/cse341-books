console.log("MONGODB_URI =", process.env.MONGODB_URI);
import app from "./app.js";
import {connectToDb} from "./src/db/connect.js";


// use port from .env or default to 3000

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.");
}

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);}
};

await startServer();