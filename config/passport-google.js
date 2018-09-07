module.exports = function(User , passport , keys){
    GoogleStrategy = require('passport-google-oauth20').Strategy;
    passport.use('google' , new GoogleStrategy({
        clientID:keys.googleClientID,
        clientSecret:keys.googleClientSecret,
        callbackURL:'http://localhost:3000/auth/google/redirect'
    },function(accessToken , refreshToken , profile , cb){
        User.findOne({'google.id':profile.id} , function(err , user){
            if(err)
                return cb(err);
            else if(user)
                return cb(null , user);
            else{
                new User({google:{
                    id: profile.id , 
                    username: profile.displayName
                }}).save(function(err , user){
                    return cb(err, user);
                });
            }
        });

    }));
};