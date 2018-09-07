module.exports = function(User){
    const router = require('express').Router();
    router.get('/',isLoggedIn,function(req,res){
        //check if user logged in and if he is logged in render todo else redirect to home
        if(req.user.local.username){
            res.render('todo' , {username:req.user.local.username , todo:req.user.todo});
        }
        else if(req.user.google.username){
            res.render('todo' , {username:req.user.google.username , todo:req.user.todo});
        }
        else if(req.user.facebook.username){
            res.render('todo' , {username:req.user.facebook.username , todo:req.user.todo});
        }
        else if(req.user.github.username){
            res.render('todo' , {username:req.user.github.username , todo:req.user.todo});
        }
        else{
            res.redirect('/');
        }
    });
    router.post('/add',isLoggedIn,function(req,res){
        User.findById(req.user.id,function(err , user){
            if(user){
                user.todo.push(req.body.item);
                user.save(function(err , user){
                    if(!err)
                        res.send(200);
                });
            }
        });
    });
    router.post('/delete',isLoggedIn,function(req,res){
        User.findById(req.user.id,function(err , user){
            if(user){
                user.todo = user.todo.filter(function(item){return item != req.body.item});
                user.save(function(err , user){
                    if(!err)
                        res.send(200);
                });
            }
        });
    });
    function isLoggedIn(req , res , next){
        if(req.isAuthenticated())
            next();
        else
            res.redirect('/');
    }
    return router;
};