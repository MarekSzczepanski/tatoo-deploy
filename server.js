const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Upload Endpoint

app.post("/add_image", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const image = req.files.file;
  image.mv(`${__dirname}/../public/uploads/${image.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: image.name, filePath: `/uploads/${image.name}` });
  });
});
// DB Config
const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

const homeRouter = require("./routes/api/home.route");
const adminRouter = require("./routes/api/admin.route");
const admin_dashboardRouter = require("./routes/api/admin_dashboard.route");
const add_newsRouter = require("./routes/api/add_news.route");
const delete_newsRouter = require("./routes/api/delete_news.route");

app.use("/api/", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin_dashboard", admin_dashboardRouter);
app.use("/api/add_news", add_newsRouter);
app.use("/api/delete_news", delete_newsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
