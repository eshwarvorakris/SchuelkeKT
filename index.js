const express = require('express');
const app = express()
var bodyParser = require('body-parser')
require('dotenv').config();

var cors = require('cors');
app.use(cors());

var methodOverride = require('method-override');

var multer = require('multer');
var upload = multer();

// allow overriding methods in query (?_method=put)
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 

// for parsing multipart/form-data
app.use(upload.array()); 


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(function(req, res, next) {
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

app.use(function(req, res, next) {
  const pageNumber=req.query?.page||1;
  const pageLimit=req.query?.limit||15;
  const order_by=req.query?.order_by??"created_at";
  const order_in=req.query?.order_in??"desc";
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
app.use("/auth",require("./routes/auth"));
app.use("/user",require("./routes/user"));
app.use("/category",require("./routes/category"));
app.use("/course",require("./routes/course"));
app.use("/module",require("./routes/module"));
app.use("/content",require("./routes/content"));
app.use("/question",require("./routes/question"));
app.use("/assignment",require("./routes/assignment"));
app.use("/widget",require("./routes/widget"));
app.use("/upload",require("./routes/fileUpload"));