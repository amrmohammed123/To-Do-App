module.exports = function(User , passport , LocalStrategy){    
    passport.use('signin' , new LocalStrategy(function(username , password , done){
        User.findOne({'local.username':username} , function(err , user){
            if(err)
                return done(err);
            else if(user){
                if(user.local.password === password)
                    return done(null , user);
                else
                    return done(null , false);
            }                
            else{
                return done(null , false);
            }
        });
    }));
};