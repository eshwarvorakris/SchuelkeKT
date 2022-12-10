const jwt = require("jsonwebtoken");
require('dotenv').config();

const Auth =class{

    generateToken(data){
        var token=jwt.sign(data,process.env.JWT_SECRET, {expiresIn: 60 });
        return token;
    }
    
    verify(req,res){
        
        return jwt.verify(req.header("token"),process.env.JWT_SECRET);
    }
} 

module.exports =new Auth();