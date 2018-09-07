module.exports = function(User , passport , keys){
    LocalStrategy = require('passport-local').Strategy;
    //set signup strategy
    require('./passport-signup')(User , passport , LocalStrategy);
    //set signin strategy
    require('./passport-signin')(User , passport , LocalStrategy);
    //set facebook strategy
    require('./passport-facebook')(User , passport , keys);
    //set google strategy
    require('./passport-google')(User , passport , keys);
    //set github strategy
    require('./passport-github')(User , passport , keys);
    //serialize , deserialize
    passport.serializeUser(function(user , done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id , done){
        User.findById(id , function(err , user){
            done(err,user);
        });
    });
};