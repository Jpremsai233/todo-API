let mongoose = require('mongoose');
let userRegisterSchema = new mongoose.Schema({
    userId:{
        type: String,
    }
    ,firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('register', userRegisterSchema);