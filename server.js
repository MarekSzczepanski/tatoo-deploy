const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const app = express();

app.use(cors());
/* app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
}); */
app.use(express.json());
app.use(fileUpload());

/* let auth; */

/* app.post("/auth", (req, res) => {
  auth = req.body;
});
app.get("/auth", (req, res) => {
  res.json(auth);
}); */
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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

/* var server = app.listen(process.env.PORT || 5000, function() {
  var port = server.address().port;
  console.log("Express is working on port " + port);
}); */
