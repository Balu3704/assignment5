var express = require('express');
const app = express();
const port = process.env.PORT||8210;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
//const mongourl ="mongodb://localhost:27017"
const mongourl ="mongodb+srv://balu3704:Balu3704@cluster0.3rynh.mongodb.net/sample?retryWrites=true&w=majority"
var db;

//get 
app.get('/',(req,res) => {
    res.send("Welcome to Node Api2")
})


//List All cities
app.get('/location',(req,res)=> {
    db.collection('location').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


//List all restaurants
app.get('/restaurant',(req,res)=> {
    db.collection('restaurant').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//List all restaurants wrt to city
// params example
/*
app.get('/restaurant/:cityId',(req,res)=> {
    var cityId = req.params.cityId;
    console.log("cityId>>>>",cityId)
    db.collection('restaurant').find({city:cityId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})*/

// query example 
app.get('/restaurant',(req,res)=> {
    var cityId = req.query.cityId?req.query.cityId:"2";
    console.log("cityId>>>>",cityId)
    db.collection('restaurant').find({city:cityId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


//List all Quicksearch data
app.get('/quicksearch',(req,res)=> {
    db.collection('mealType').find().toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


MongoClient.connect(mongourl, (err,client) => {
    if(err) console.log("Error while Connecting");
    db = client.db('sample');
    app.listen(port,()=> {
        console.log(`listening on port no ${port}`)
    });
})

