const router = require('express').Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// register user
router.post("/register", validInfo, async (req, res) => {
  try {

    const {first_name, email, contact_no, password} = req.body;

    const user = await pool.query("SELECT id FROM users WHERE email=$1 OR mobile=$2", [email, contact_no]);
    if(user.rows.length !== 0)
    {
      res.status(401).send("User Already Exists");
    }
    else
    {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
        "INSERT INTO users (first_name, email, mobile, password) VALUES ($1, $2, $3, $4) RETURNING *", 
        [first_name, email, contact_no, bcryptPassword]);
      
      const token = jwtGenerator(newUser.rows[0].id, newUser.rows[0].name, newUser.rows[0].email, newUser.rows[0].address, newUser.rows[0].mobile, newUser.rows[0].role);
      res.json({token});
    }
    //res.json(user.rows);

  } catch(err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Login User
router.post("/login", validInfo, async(req, res) => {
  try {
    
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    console.log("login request recived");
    if(user.rows.length === 0)
    {
      return res.status(401).json("Email Or Password is incorect");
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    //console.log(validPassword);
    if(!validPassword)
    {
      return res.status(401).json("Email Or Password is incorect");
    }

    const token = jwtGenerator(user.rows[0].id, user.rows[0].first_name, user.rows[0].email, user.rows[0].address, user.rows[0].mobile, user.rows[0].role);
    res.json({token:token , user : user.rows[0]});

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get('/verifyUser', authorization, async(req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;