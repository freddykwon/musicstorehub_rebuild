const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

const cors = require('cors');
const { populate } = require('./models/Users');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/musicstores")

app.get("/getUsers/", (req, res) =>{
    UserModel.find({}, (err, result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save(); 
    res.json(user);
});

app.delete("/deleteUser/:id", (req,res) => {
    const id = req.params.id;
    UserModel.deleteOne({id}, function (err){
        if (err) {
            console.log(err)
        }
        else {
            return res.send ("Removed")
        }
    });
});

app.listen(3001, () => {
    console.log("On Port 3001")
}); 
