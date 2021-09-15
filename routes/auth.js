let express = require('express')
let router = express.Router()
let passport = require('passport')
let User = require('../models/user')    

router.get('/register', function(req, res){
    res.render("register.ejs")
})
router.post('/register', function(req, res){
    let newIncoming =  new User({username: req.body.username})
    User.register(newIncoming, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.redirect("/register");
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/crunchSpot')
        })
    })  
})

router.get('/login', function(req, res){
    res.render('login')
})

router.post('/login', passport.authenticate('local',{
        successRedirect: "/campgrounds",
        failureRedirect: "/login"    
    }),
    function(req, res){

})
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/') 
})

function checkLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}
module.exports = router;