const express = require('express')
const validator = require('Validator');
const _= require("lodash");

    exports.login=function(req, res) {
        const rules = {
            email: 'required',
            password: 'required',        
        };
        const validation = validator.make(req.body, rules);
        if (validation.fails()) {
            res.send({message:_.chain(validation.getErrors()).flatMap().head(),errors:validation.getErrors()},422);        
        }
        res.send({data:req.body});
    }


    exports.registration=function(req, res) {
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
    }