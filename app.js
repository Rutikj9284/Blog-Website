//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect('mongodb://0.0.0.0/BlogDB',
{useNewUrlParser: true,
useUnifiedTopology:true
})
.then(()=>{
console.log("CONNECTION OK")
})
.catch(err=>{
console.log("CONNECTION IS BAD")
console.log(err)
});

const itemSchema = ({
    title: String,
    description: String
});

const Item = mongoose.model("Item", itemSchema);
// let postArr = [];  //To store new composed posts

const homeStartingContent = "Welcome to Daily Journals! Our blog is dedicated to bringing you the latest and most insightful content on [topic or niche]. Whether you're a passionate enthusiast or a curious beginner, we strive to provide informative articles, helpful guides, and engaging discussions to cater to your interests. Join us on this exciting journey and explore the fascinating world of [topic or niche].";
const aboutContent = "At Daily Journals, we are driven by a deep love for [topic or niche]. Our team of dedicated writers and experts is committed to delivering high-quality, well-researched, and thought-provoking content to our readers. We believe in the power of knowledge and aim to inspire, educate, and entertain through our articles. From in-depth analyses to practical tips and inspiring stories, we cover a wide range of topics to cater to the diverse interests of our audience. Thank you for being a part of our community!";
const contactContent = "We value your feedback, suggestions, and inquiries. If you have any questions, comments, or collaboration opportunities, please feel free to reach out to us. You can contact us by filling out the form below or sending an email to jaybhayerutik2@gmail.com. We appreciate your time and will make every effort to respond to your message as soon as possible. Stay connected with us on social media platforms to stay updated with our latest articles, announcements, and community interactions.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    Item.find({}
        ).then(function(posts){
            res.render("home", {content: homeStartingContent,
            newPost: posts});
        })
});
app.get("/about", function(req, res){
    res.render("about", {content : aboutContent});
});
app.get("/contact", function(req, res){
    res.render("contact", {content : contactContent});
})
app.get("/compose", function(req, res){
    res.render("compose");
});

app.post("/compose", function(req, res){
    const item = new Item({
        title : req.body.titleInput,
        description : req.body.postInput
    });
    item.save();
    res.redirect("/");
   
});

//By lodash all - . _ -- will be ignored  and we can find the post even if we typed posts/another-post for Another Post

app.get("/posts/:postID", function(req, res){
    const postID = req.params.postID;
    Item.findOne({_id: postID}
        ).then(function(posts){
            res.render("post", {title: posts.title,
            content: posts.description});
        })
    
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
