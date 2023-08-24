const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    Username : String,
    Title : String,
    Content : String,
    Category : String,
    date:String
},{
    versionKey: false
});


const BlogModel = mongoose.model("blogs", BlogSchema);


module.exports = {
    BlogModel
}