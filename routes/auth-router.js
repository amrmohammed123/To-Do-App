module.exports = function(User , keys , passport){
    const router = require('express').Router();
    const nodemailer = require('nodemailer');
    router.get('/signin', isLoggedIn ,function(req,res){
        res.render('signin', {message:req.flash('error')});
    });
    router.get('/signup', isLoggedIn ,function(req,res){
        res.render('signup', {message:req.flash('error')});
    });
    router.post('/userSignup', isLoggedIn , passport.authenticate('signup' , {
        successRedirect:'/todo',
        failureRedirect:'/auth/signup',
        failureFlash: 'This username already exists'
    }));
    router.post('/userSignin', isLoggedIn , passport.authenticate('signin' , {
        successRedirect:'/todo',
        failureRedirect:'/auth/signin',
        failureFlash: 'username or password is invalid'
    }));
    //handle google login
    router.get('/google',passport.authenticate('google' , {'scope':['profile']}));
    router.get('/google/redirect',passport.authenticate('google' , { 
        successRedirect:'/todo',
        failureRedirect:'/auth/signup',
        failureFlash: "couldn't log in with google"
    }));
    //handle facebook login
    router.get('/facebook',passport.authenticate('facebook'));
    router.get('/facebook/redirect',passport.authenticate('facebook' , { 
        successRedirect:'/todo',
        failureRedirect:'/auth/signup',
        failureFlash: "couldn't log in with facebook"
    }));
    //handle github login
    router.get('/github',passport.authenticate('github'));
    router.get('/github/redirect',passport.authenticate('github' , { 
        successRedirect:'/todo',
        failureRedirect:'/auth/signup',
        failureFlash: "couldn't log in with github"
    }));
    router.get('/send-email' , isLoggedIn , function(req,res){
        res.render('send-email');
    });
    router.post('/email' , isLoggedIn , function(req,res){
        //send email
        User.findOne({'local.email':req.body.email} , function(err , user){
            if(err){
                console.log(err);
                res.end('some error has occured');
            }
            else{
                if(user){
                    const password = user.local.password; //find password
                    const transporter = nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:keys.user,
                            pass:keys.pass
                        }
                    });
                    const mailOptions = {
                        from:keys.user,
                        to:req.body.email,
                        subject:'recovering password todo app',
                        text:password
                    };
                    transporter.sendMail(mailOptions , function(err , info){
                        if(err)
                            res.end(err);
                        else
                            res.render('home' , {email:'an email has been sent with your password'});
                    });
                }
                else{
                    res.end('there is no user with that email');
                }


            }
        });
        
    });
    router.get('/logout' , function(req , res , next){
        if(req.isAuthenticated())
            next();
        else
            res.redirect('/');
    },function(req,res){
        req.logout();
        res.redirect('/');
    });  
    function isLoggedIn(req , res , next){
        if(req.isAuthenticated())
            res.redirect('/todo');
        else
            next();
    }  
    return router;
};
