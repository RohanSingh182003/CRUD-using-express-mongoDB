const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json()); // create request.body into json format.

mongoose.connect("mongodb://127.0.0.1:27017/crud", () =>
  console.log("DB Connected....")
); //connect database
app.listen(3000, () => console.log("Server listen on port 3000.")); // App listening on port 3000

// create schema
const memberSchema = new mongoose.Schema({
  name: {
    type: String, // define datatype to string
    required: true, //make this field a required field
    lowercase: true, // convert data into lowercase
    unique: true, // make this field unique
    trim: true, // remove unwanted spaces
  },
  programming_language: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// create model
const Member = new mongoose.model("Member", memberSchema);

// add data
app.post("/api/data", (req, res) => {
  let ins = new Member({
    name: req.body.name,
    programming_language: req.body.programming_language,
    age: req.body.age,
  });
  // function for save members
  const saveMember = async (ins) => {
    try {
      let result = await ins.save();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  };
  saveMember(ins);
});

// get data
app.get("/api/data", (req, res) => {
  const getData = async () => {
    try {
      let result = await Member.find();
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  };
  getData();
});

//get single data
app.get("/api/data/:name", (req, res) => {
  const getData = async () => {
    try {
        let result = await Member.find({ name: req.params.name });
    if(result.length > 0){
    res.send(result);
}
else{
    res.send('Data not found.')
}
    } catch (error) {
        res.send(error)
    }
  };
  getData()
});

// update data
app.put('/api/data/:name',(req,res)=>{
    const updateData = async () => {
    try {
        let result = await Member.find({ name: req.params.name });
    if(result.length > 0){
        let updated_result = await Member.findOneAndUpdate({ name: req.params.name },{age:req.body.age,name:req.body.name,programming_language: req.body.programming_language })
        res.send(updated_result);
    }
    else{
        res.send('Data not found.')
    }
    } catch (error) {
        res.send(error)
    }
      };
      updateData()
})

// delete data
app.delete('/api/data/:name',(req,res)=>{
    const deleteData = async () => {
        try {
            let result = await Member.find({ name: req.params.name });
            if(result.length > 0){
                let deleted_result = await Member.findOneAndDelete({ name: req.params.name })
                res.send(deleted_result);
            }
            else{
                res.send('Data not found.')
            }
        } catch (error) {
            res.send(error)
        }
    }
    deleteData()
})
