let express = require('express')
let router = express.Router();
let crunchSpot = require('../models/crunchSpotModel')
router.get('/',(req,res) => {
    res.redirect("/crunchSpot");
})
router.get('/crunchSpot', function(req, res){
    
    crunchSpot.find({},function(err,posts){
        res.render("index.ejs",{ posts : posts });
    })
})
router.get('/crunchSpot/new', checkLogin, function(req,res){
    res.render("new.ejs");
})
router.post('/crunchSpot',function(req, res){ 
    crunchSpot.create(req.body.newPost, function(error,newPost){
        if(error){    
            console.log("boom");
            res.redirect("/crunchSpot/new");
        }else{
            // console.log(req.body.newPost);
            res.redirect("/crunchSpot"); 
        }
    });
});

router.get('/crunchSpot/:id', checkLogin, function(req, res){
    crunchSpot.findById(req.params.id, function(err,postFound){
        if(err){
            res.redirect("/crunchSpot");
        }
        res.render("show.ejs",{postFound :postFound})
    })
});

router.get('/crunchSpot/:id/edit',function(req,res){
    crunchSpot.findById(req.params.id, function(err,postFound){
        console.log(req.params.id); 
        res.render("edit.ejs",{newPost :postFound})
    }) 
})

router.put('/crunchSpot/:id',function(req, res){ 
    crunchSpot.findByIdAndUpdate(req.params.id,req.body.newPost, function(error,newPost){
        if(error){    
            console.log("boom");
            res.redirect("/crunchSpot/edit");
        }else{ 

            res.redirect(`/crunchSpot/${req.params.id}`); 
        }
    });
});

router.delete('/crunchSpot/:id',function(req, res){ 
    crunchSpot.findByIdAndRemove(req.params.id, function(error,newPost){
        if(error){     
            console.log(error);
            res.redirect("/crunchSpot");
        }else{ 
            res.redirect("/crunchSpot");
        }
    });
});
function checkLogin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}
module.exports = router;