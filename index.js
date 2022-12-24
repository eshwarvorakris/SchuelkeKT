const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();
var methodOverride = require('method-override');

const app = express()


// allow overriding methods in query (?_method=put)
//app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
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