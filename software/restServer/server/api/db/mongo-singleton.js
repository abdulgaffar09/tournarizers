import mongodb from 'mongodb';
// const MongoClient = require('mongodb').MongoClient;
var mongoClient = function mongoClient(){
    this.client = new mongodb
    .MongoClient("mongodb+srv://gamer:wFychmhZTy0P5bN4@mongotour-8gfmt.mongodb.net/tournarizer_dev?retryWrites=true&w=majority", 
    { useNewUrlParser: true });    
}

export default mongoClient;

