
require('../models/userModel')
require('../models/todosModel')

var userRegisterSchema = require('mongoose').model('register');
var todosSchema = require('mongoose').model('todos');
var uuid = require('uuid')
var passwordHash = require("password-hash")
const jwt = require('jsonwebtoken');



async function stuRegister(req, res) {
    let reqData = req.body
    let user = await userRegisterSchema.findOne({ email: reqData.email.toLowerCase() })
    if (user) {
        res.send({
            msg: " email already exist",
            code: 5000
        })


    } else {
            var hashedPassword = passwordHash.generate(reqData.password)
            let query = {
                userId: uuid.v4(),
                firstName: reqData.firstName,
                lastName: reqData.lastName,
                email: reqData.email,
                password: hashedPassword,

            }
            let userRec = await new userRegisterSchema(query)
            let result = await userRec.save()
            if (result) {


                res.send({
                    msg: " Registration Sucessful",
                    code: 2000,
                    data: result
                })

            } else {
                res.send({
                    msg: " Registration Failed",
                    code: 5000,

                })
            }
        
    }

}


async function stuLogin(req, res) {
    let reqBody = req.body
    let result = await userRegisterSchema.findOne({ email: reqBody.email })
    if (result) {
        let passwordCheck = await passwordHash.verify(reqBody.password, result.password)
        if (passwordCheck) {
                let jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa";
                const token = jwt.sign(
                    {
                        id: result._id,
                        email: result.email,
                    },
                    jwt_secrect
                );
                res.send({
                    msg: "sucessfully loggedIn",
                    code: 2000,
                    data: result,
                    token: token

                })
            

        } else {
            res.send({
                code: 5000,
                msg: "Password wrong"
            })
        }

    } else {
        res.send({
            msg: "email doesNot exist",
            code: 5000
        })
    }


}

async function logout(req, res) {
    reqbody = req.body
    var logOut = await userRegisterSchema.findOneAndUpdate({ _id: reqbody.id })
    if (logOut) {
        res.json({
            msg: "loggedOut sucessful",
            code: 2000,
            result:logOut
        })
    } else {
        res.json({
            msg: "failed to logOut",
            code: 5000
        })
    }

}

async function createTodo(req,res){
    let body = req.body
    let query = await todosSchema.insertMany({todoId: uuid.v4(), todos: body.todos, userId: req.params.userId})
    if(query){
        res.send({
            msg: 'todo created',
            code: 2000,
            todos: query
        })
    } else{
        res.send({
        msg: 'todo not created',
        code: 5000
        })
    }
}

async function getTodos(req, res) {
    let todosList = await todosSchema.find({userId: req.params.userId})
    if (todosList) {
        res.json({
            msg: "sucessfully found all Todos",
            code: 2000,
            result: todosList

        })
    } else {
        res.json({
            msg: "failed to find Todos",
            code: 5000
        })
    }
}

async function deleteTodo(req, res) {
    try {
        const result = await todosSchema.deleteOne({ todoId: req.params.todoId }).exec();

        if (result.deletedCount > 0) {
            res.send({
                msg: "Todo deleted successfully",
                code: 2000
            });
        } else {
            res.send({
                msg: "Todo not found or delete failed",
                code: 5000
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            msg: "Internal Server Error",
            code: 5000
        });
    }
}


async function updateTodos(req,res){
    let updating = await todosSchema.updateOne({todoId: req.params.todoId, userId: req.params.userId}, {$set: {todos: req.body.todos}})   
        if(updating){
        res.send({
        msg: 'todo updated successfully',
        code: 2000,
        update: updating
    })
} else{
    res.send({
        msg: 'todo update failed',
        code: 5000
    })
}
   
}

module.exports = {
    stuRegister,
    stuLogin,
    logout,
    getTodos,
    deleteTodo,
    updateTodos,
    createTodo
}
