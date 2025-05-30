const express = require('express');

const router = express.Router();

const db = require('../db/db');

router.get("/index", (req, res) => {
    res.render('index')
});

router.get("/about", (req, res) => {
    res.render('about')
});

router.post("/book-mini", (req, res) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var days = req.body.days;
    var vehicle = "mini";

    var data ={
        "name" : name,
        "phone" : phone,
        "address" : address,
        "days" : days,  
        "vehicle" : vehicle 
        }

    db.collection('booking').insertOne(data, (error, collection) => {

    console.log("request received")
    

    });   

    return res.redirect('/index?success=true')

})

router.post("/book-sedan", (req, res) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var days = req.body.days;
    var vehicle = "sedan";
    
    var data ={
        "name" : name,
        "phone" : phone,
        "address" : address,
        "days" : days,  
        "vehicle" : vehicle 

    }
    
    db.collection('booking').insertOne(data, (error, collection) => {
    
        console.log("request received")
        
    
    });   

    return res.redirect('/index?success=true')
   
})

router.post("/book-suv", (req, res) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var days = req.body.days;
    var vehicle = "suv";
        
    var data ={
        "name" : name,
        "phone" : phone,
        "address" : address,
        "days" : days,  
        "vehicle" : vehicle   
                 
    }
        
    db.collection('booking').insertOne(data, (error, collection) => {
        
        console.log("request received")
        
        
    });   
        
    return res.redirect('/index?success=true')
        
})


module.exports = router;