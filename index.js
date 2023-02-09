const express = require('express');
const app = express();
const _ = require("lodash");
var bodyParser = require('body-parser');
require('dotenv').config();

var cors = require('cors');
app.use(cors());

var methodOverride = require('method-override');
const auth = require('./lib/auth');

var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
      if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "application/pdf" ||
          file.mimetype === "application/ppt" ||
          file.mimetype === "application/pptx"
      ) {
          done(null, true);
      } else {
          //prevent the upload
          var newError = new Error("File type is incorrect");
          newError.name = "MulterError";
          done(newError, false);
      }
  },
});

var uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: 1024 * 1024 * 10,
  },
  fileFilter: function (req, file, done) {
      if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "application/pdf" ||
          file.mimetype === "application/ppt" ||
          file.mimetype === "application/pptx"
      ) {
          done(null, true);
      } else {
          //prevent the upload
          var newError = new Error("File type is incorrect - " +file.mimetype);
          newError.name = "MulterError";
          done(newError, false);
      }
  },
});


// allow overriding methods in query (?_method=put)
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 

// for parsing multipart/form-data
//app.use(upload.array()); 
/* app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
})); */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(function(req, res, next) {
  let queryParams=_.pickBy(req.query, (i)=>!_.isEmpty(i));
  req.query=queryParams;
  const pageNumber=req.query.page||1;
  const pageLimit=req.query.limit||15;
  const order_by=req.query.order_by??"created_at";
  const order_in=req.query.order_in??"desc";
  delete req.query.page;
  delete req.query.order_by;
  delete req.query.order_in;
  delete req.query.limit;

  global.pageNumber=pageNumber-1;
  global.pageLimit=pageLimit;
  global.orderByColumn=order_by.concat("."+order_in).split(".");
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

//Routes 
app.use("/auth",upload.array(),require("./routes/auth"));
//const authenticateRouter=app.routes();
//authenticateRouter.use(auth);
app.use("/user",upload.array(),require("./routes/user"));
app.use("/category",upload.array(),require("./routes/category"));
app.use("/course",upload.array(),require("./routes/course"));
app.use("/courseView",upload.array(),require("./routes/course_view"));
app.use("/module",upload.array(),require("./routes/module"));
app.use("/content",upload.array(),require("./routes/content"));
app.use("/question",upload.array(),require("./routes/question"));
app.use("/assignment",upload.array(),require("./routes/assignment"));
app.use("/widget",upload.array(),require("./routes/widget"));
app.use("/upload",upload.single('uploadFile'),require("./routes/fileUpload"));