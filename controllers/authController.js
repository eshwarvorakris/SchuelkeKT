const express = require('express')

class authController {
    login(req, res) {
        res.send(validation());
        const rules = {
            email: 'required',
            password: 'required',
            
        };
        const validation = validator.make(req.body, rules);
        if (validation.fails()) {
            res.send({message:_.chain(validation.getErrors()).flatMap().head(),errors:validation.getErrors()},422);
            
        }
        res.send(req.body);
    }

    

}

module.exports = authController