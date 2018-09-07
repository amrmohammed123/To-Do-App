module.exports = function(User , passport , LocalStrategy ){
    passport.use('signup' , new LocalStrategy({
        passReqToCallback:true
    } , function(req , username , password , done){
        User.findOne({'local.username':username} , function(err , user){
            if(err)
                return done(err);
            else if(user)
                return done(null , false);
            else{
                new User({
                    local:{
                        username:username,
                        email:req.body.email,
                        password:password
                    },
                    todo:[]}).save(function(err , user){
                        if(err)
                            return done(err);
                        else
                            return done(null , user);
                    });
            }
        });
    }));
};