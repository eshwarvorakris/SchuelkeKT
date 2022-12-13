const express = require("express");
const app = express();
var cors = require('cors');
const pool = require("./db");

//middleware
app.use(express.json());

app.use(cors());

// Routes

//register and login routes
app.use("/users", require("./routes/userAuth"));

// dashboard 
app.use("/dashboard", require("./routes/dashboard"));


app.listen(5000, () => {
  console.log("Server Started");
});