const router = require('express').Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get('/', authorization, async(req, res) => {
  try {

    const user = await pool.query("SELECT first_name, email, address, mobile, edu_background, role FROM users WHERE id=$1", [req.userId])
    const profile = user.rows[0];
    res.json({profile});

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;