let express        = require('express');
let bodyParser     = require('body-parser');
let mongoose       = require('mongoose');
let methodOverride = require('method-override');
let passport       = require('passport'); 
let LocalStrategy  = require('passport-local').Strategy;
let crunchSpot     = require('./models/crunchSpotModel')
let User           = require('./models/user');

let crunchSpotRoutes = require('./routes/crunchSpot')
let auth = require('./routes/auth')
let app = express();
// middlewares configuration
mongoose.connect("mongodb://localhost/crunchSpot",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },function(){
        console.log("connected to local Database");
});
app.set('view engine','ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"))

//passport configuration
app.use(require('express-session')({
    secret: "masaow is the best",
    resave: false,
    saveUninitialized: false

})) 
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function( req, res, next){
    res.locals.currentuser = req.user;
    next()
})
app.use(crunchSpotRoutes)
app.use(auth)
// model Schema

// crunchSpot.create({
//     title : "codeforces",
//     image : "https://news.itmo.ru/images/news/big/917925.jpg",
//     content : "U can do it"
// })

// authentication

// my_routes

var port = process.env.PORT || 4000;
app.listen(port, function(req,res){

    console.log(`Well done masaow!!!, Server starting at ${port}`);
})