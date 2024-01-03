const mongoose = require('mongoose')

let todosSchema = new mongoose.Schema({
    todoId:{
        type: String,
    },
    todos:{
        type: String,
        required: true
    },
    userId:{
        type:String
    }
})

module.exports = mongoose.model('todos', todosSchema)