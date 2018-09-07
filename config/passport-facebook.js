module.exports = function(User , passport , keys){
    FacebookStrategy = require('passport-facebook').Strategy;
    passport.use('facebook' , new FacebookStrategy({
        clientID:keys.facebookClientID,
        clientSecret:keys.facebookClientSecret,
        callbackURL:'http://localhost:3000/auth/facebook/redirect'
    },function(accessToken , refreshToken , profile , cb){
        User.findOne({'facebook.id':profile.id} , function(err , user){
            if(err)
                return cb(err);
            else if(user)
                return cb(null , user);
            else{
                new User({facebook:{
                    id: profile.id , 
                    username: profile.displayName
                }}).save(function(err , user){
                    return cb(err, user);
                });
            }
        });
    }));
};