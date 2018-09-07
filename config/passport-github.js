module.exports = function(User , passport , keys){
    GithubStrategy = require('passport-github').Strategy;
    passport.use('github' , new GithubStrategy({
        clientID:keys.githubClientID,
        clientSecret:keys.githubClientSecret,
        callbackURL:'http://localhost:3000/auth/github/redirect'
    },function(accessToken , refreshToken , profile , cb){
        console.log(profile.id);
        User.findOne({'github.id':profile.id} , function(err , user){
            if(err)
                return cb(err);
            else if(user)
                return cb(null , user);
            else{
                new User({github:{
                    id: profile.id , 
                    username: profile.username
                }}).save(function(err , user){
                    return cb(err, user);
                });
            }            
        });

    }));
};