require('dotenv').config()
const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const AuthRouter = require("./routs/AuthRouter")

const mongoUrl = process.env.Db_URL
mongoose.connect(mongoUrl)

const TodoModel = require("./models/Todos");
const isAuthenticated = require('./middlewares/IsAuth');

const app = express(); // Create an instance of express
app.use(cors());       //data recived from diffrent domains
app.use(express.json()); // means the data recived in jason
app.use(bodyParser.json());

app.use("/auth",AuthRouter)

//////////////////////////////////////////////////////////////////////////////

app.post("/createTodo",isAuthenticated, async (req, res) => {
    // const {body}=req  //req.body my sy jo data aya hy vo mol jay ga
    // console.log(body)

    let todo = req.body
    const newTodo = new TodoModel(todo);
    try {
        await newTodo.save()
        res.json({message:"Created Successfully",todo})

    } catch (err) {
        res.json({message:"Internel server error"})
    }

    // res.send("data recived")//message send to client
})

/////////////////////////////////////////////////////////////////////////////

app.get("/readTodos",isAuthenticated ,async (req, res) => {
    console.log("-----Enshre user details------",req.user)
    const todos = await TodoModel.find();
    res.send(todos)
})

//////////////////////////////////////////////////////////////////////////////
app.post("/updateTodo", async (req, res) => {

    let todo = req.body
    // let data = { ...todo }
    // delete data.id

    try {
        await TodoModel.findByIdAndUpdate(todo._id, { title: "Todo Updated" })
        res.send("Todo Updated")//message send to client
    } catch (err) {
        res.send("Something went wrong")//message send to client

    }
})

app.post("/deleteTodo", async (req, res) => {

    let todo = req.body

    try {
        await TodoModel.findByIdAndDelete(todo._id)
        res.send("Todo Deleted")//message send to client
    } catch (err) {
        res.send("Something went wrong")//message send to client

    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running perfectly on Port:", PORT);
});
