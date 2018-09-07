//import necessary modules
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const User = require('./models/user')(keys);
const session = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const homeRouter = require('./routes/home-router');
const authRouter = require('./routes/auth-router')(User , keys , passport);
const todoRouter = require('./routes/todo-router')(User);
//configure passport
require('./config/passport')(User , passport , keys);
//for logging http requests
app.use(logger('dev'));
//set session for passport
app.use(session({keys:['abc']}));
//use flash messages
app.use(flash());
//set passport
app.use(passport.initialize());
app.use(passport.session());
//use body parser for form requests
app.use(bodyParser.urlencoded({extended:false}));
//set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//handle static files
app.use(express.static( __dirname + '/public'));

//handle different routes
app.use(homeRouter);
app.use('/auth' , authRouter);
app.use('/todo' , todoRouter);
//listen on port 3000
app.listen(3000 , function(){
    console.log('app is listening on port 3000');
});