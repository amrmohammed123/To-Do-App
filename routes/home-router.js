const router = require('express').Router();
router.get(['/','/home'] , isLoggedIn , function(req,res){ 
    //check if user logged in and if he is logged in redirect to /todo else redirect to home
    res.render('home' , {email:''});
});
function isLoggedIn(req , res , next){
    if(req.isAuthenticated())
        res.redirect('/todo');
    else
        next();
}  
module.exports = router;