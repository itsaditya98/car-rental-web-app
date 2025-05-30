
var mongoose = require("mongoose")
mongoose.connect('mongodb://mongodb:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db=mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));


module.exports = db;

