const mongoose = require("mongoose")

let todoSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const TodoModel = mongoose.model("todos",todoSchema) 
module.exports = TodoModel;