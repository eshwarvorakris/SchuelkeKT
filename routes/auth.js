const express = require("express");
const router = express.Router();
const validator = require('Validator');
const _= require("lodash");
// middleware that is specific to this router

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.post("/login", (req, res) => {
    
    const rules = {
        email: 'required',
        password: 'required',        
    };
    const validation = validator.make(req.body, rules);
    if (validation.fails()) {
        res.send({message:_.chain(validation.getErrors()).flatMap().head(),errors:validation.getErrors()},422);        
    }
    res.send({data:req.body});
});
// define the about route
router.post("/registration", (req, res) => {
    const rules = {
        first_name: 'required',
        last_name: 'required',
        email: 'required|email',
        mobile: 'required',
        password: 'required|confirmed',
        
    };
    const validation = validator.make(req.body, rules);
    if (validation.fails()) {
        res.send({message:_.chain(validation.getErrors()).flatMap().head(),errors:validation.getErrors()},422);
        
    }
    res.send({data:req.body});
});

module.exports = router;
