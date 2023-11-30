const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Model/User");
const ListModel = require("./Model/Lists");
const AddMovieTolistModel = require("./Model/AddMovieToList")
const { list } = require("postcss");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MovieFlix");

const db = mongoose.connection;

app.post("/Signup", (req, res) => {
  const email = req.body.email;
  UserModel.findOne({email : email}).then((user) =>{
    if(!user)
    {
      UserModel.create(req.body)
        .then((User) => res.json(User))
        .catch((err) => res.json(err));
    }
    else{
      res.send({status : "Not Success"})
    }
  })
});

app.post("/Signin", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "Successfully Login", ID: user._id ,Name:user.name});
      } else {
        res.json({messagePass : "Password you have entered is Wrong !"});
      }
    } else {
      res.json({ messageUser: "No User Found With This Email !"});
    }
  });
});

app.post("/CreateList",(req,res) => {
  ListModel.create(req.body)
  .then((List) => res.json(List))
  .catch((err) => res.json(err));
})

app.post("/GetLists", async (req,res) => {
  const ID = req.body;
  try{
    const list = await ListModel.find({ userID : ID.userID});
    res.send({ status: "ok" , data: list});
  }
  catch(Err){ 
    console.log(Err)
  }
})

app.post("/AddMovieToList", async(req,res) => {
    AddMovieTolistModel.create(req.body)
    .then(res.send('Success'))
    .catch((err) => err)
})

app.delete("/deleteList/:listID", (req,res) => {
  const listID = req.params.listID;
  try{
    ListModel.findOneAndDelete({_id : listID})
    .then(result => res.json(result))
    .catch((err) => res.json(err))
  }catch(err){
      console.log(err)
  }
})

app.post("/GetlistMovies" , async(req,res) =>{
  const listID = req.body.listID;
  try{
    const listMovie = await AddMovieTolistModel.find({ listID : listID});
    res.send({data : listMovie})
  }
  catch(err){
    console.log(err)
  }
})

app.listen(3001, () => {
  console.log("server is running");
});
