const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const app = express();
const mongoose = require("mongoose");


 var items = [] ;
 var workitems = [] ;
mongoose.connect("mongodb://localhost:27017/listDB" ,{useNewUrlParser : true , useUnifiedTopology : true} );
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

const itemSchema = {
    item : String
};

const Item = mongoose.model("item" , itemSchema );
const item1 = new Item(
    {
        item : "Welcome to the to-do list"
    }
);
const item2 = new Item(
    {
        item : "Press + to  add mew items"
    }
);
const item3 = new Item (
    {
        item : "Press this to remove an item"
    }
);
itemArray = [item1 , item2 , item3] ;


app.get("/" , function(req , res){

       Item.find({} , function(err , foundItems){
           if(foundItems.length === 0){
            Item.insertMany(itemArray , function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("success");
                }
                res.redirect("/");
            });
           }
           if(err){
               console.log(err);
           }
           else{
            const day = date.getdate();
            res.render("list" , {
                newday : day ,
                newitems : foundItems
            
               });
             
        
           }
       })
        
     
});

app.get("/:id" , function(req , res){
    res.send(req.params.id);
})


app.post("/" , function(request , res){
 let i = request.body.addedItem;
   const it = new Item(
       {
           item : i
       }
   )
       it.save();
       res.redirect("/");
   
  
  
})

app.post("/delete" , function(req , res){
     Item.findByIdAndRemove(req.body.checkbox , function(err){
         if(!err){
             console.log("success");
         }
     });
     res.redirect("/");
})

app.listen(3000 , function(){
    console.log("server is running at 3000");
})




























