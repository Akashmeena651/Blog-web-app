let mongoose = require('mongoose') 
let modelSchema = new mongoose.Schema({
    title : String,
    image : String,
    content : String,
    created : {     
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("crunchSpot", modelSchema)