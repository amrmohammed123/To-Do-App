module.exports = function(keys){
    const mongoose = require('mongoose');
    mongoose.connect(keys.database , {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error' , function(){
        console.log('some error has happened with the database');
    });
    db.once('open' , function(){
        console.log('database is connected');
    });
    const userSchema = new mongoose.Schema({
        local:{
            username:String,
            email:String,
            password:String
        },
        google:{
            username:String,
            id:String
        },
        facebook:{
            username:String,
            id:String  
        },
        github:{
            username:String,
            id:String
        },
        todo:[]
    });
    const User = mongoose.model('User' , userSchema);
    return User;
};