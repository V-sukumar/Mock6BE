const express = require("express");
const { auth } = require("../MiddleWare/authmiddleware");
const { BlogModel } = require("../Model/Blog.model");


const BlogRouter = express.Router();
BlogRouter.use(auth);


BlogRouter.get("/blogs", async(req,res) => {
    try{
        const Blog=await BlogModel.find()
        if(Blog){
            res.status(200).json({Blog})
        }else{
            res.status(400).json({msg:"Post not Found"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
})


BlogRouter.post("/blogs", async(req,res) => {
   try{
    console.log(req.body);
    const post = new BlogModel(req.body);
    await post.save();
    res.json({msg: "Post create successfully"});     
   }catch(err){
    res.json(err);
   }
})


BlogRouter.patch("/blogs/:id", async (req,res) => {
    try{
       const postID = req.params.id;
        await BlogModel.findByIdAndUpdate({_id:postID}, req.body);
        res.status(200).json({"msg": "updated"})
    }catch(err){
        res.status(400).send(err);
    }
})


BlogRouter.delete("/blogs/:id", async(req,res) => {
    try{
        const postID = req.params.id;
         await BlogModel.findByIdAndDelete({_id:postID}, req.body);
         res.status(200).json({"msg": "title has been deleted"})
     }catch(err){
         res.status(400).send(err);
     }
})

BlogRouter.get(`/blogs?title`,async(req,res)=>{
    try {
        const {search}=req.query;
        if(!search){
            const title=await BlogModel.find()
            res.status(200).json({title})
        }
        const filter=await BlogModel.filter(item=>item.Title.toLowerCase().includes(search.toLowerCase()))
        res.status(200).json(filter)
    } catch (err) {
        res.status(400).send(err)
    }
})

BlogRouter.get(`/blogs?category`,async(req,res)=>{
    try {
        const {category}=req.query;
        if(category){
            let filter=await BlogModel.filter(item=>item.Category===category)
            res.status(200).json({filter})
        }else{
            res.status(400).json({"msg":"not found"})
        }
    } catch (err) {
       res.status(400).json(err) 
    }
})

BlogRouter.get(`/blogs/?sort=date&order=asc`,async(req,res)=>{
    try {
        const {sort}=req.query
        if(sort){
            let filter=await BlogModel.sort((a,b)=>new Date(b.date)-new Date(a.date))
            res.status(200).json({filter})
        }
    } catch (err) {
        res.status(400).json(err)
    }
})
module.exports = {
    BlogRouter
}