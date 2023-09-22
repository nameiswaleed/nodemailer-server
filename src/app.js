const express = require("express");
const config = require("./config");
const cors = require("cors");
const port = config.port;
const mailRouter = require("./routes/mail.routes");
// initialize app
const app = express();
//middleware
app.use(express.json());
app.use(cors());
//routes
app.use("/api/mail", mailRouter);
// listen to app
app.listen(port, () => {
  console.log("🚀 App is listening on port ", port);
});
