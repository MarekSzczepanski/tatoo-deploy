const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const app = express();
var compression = require("compression");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// DB Config
const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const homeRouter = require("./routes/api/home.route");
const adminRouter = require("./routes/api/admin.route");
const add_newsRouter = require("./routes/api/add_news.route");
const delete_newsRouter = require("./routes/api/delete_news.route");
const manage_imageRouter = require("./routes/api/manage_image.route");

app.use("/api/", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/add_news", add_newsRouter);
app.use("/api/delete_news", delete_newsRouter);
app.use("/api/manage_image", manage_imageRouter);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(compression());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
