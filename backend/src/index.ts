// Dependencies
import app from "./app";

// configuration
const { PORT } = process.env;

app.on("error", (error) => {
  console.log("Application isn't ready to run");
  throw error;
});
// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
