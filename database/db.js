var mongoose = require('mongoose');

require('../models/userModel')
require('../models/todosModel')

function dbConnection() {

    mongoose.connect(`mongodb+srv://PREM-SAI_23:prem233@todos-app.8jhwpgi.mongodb.net/?retryWrites=true&w=majority`).then(() => {
        console.log("Database connected successfully");

    })
        .catch((error) => {
            console.log("Error in connecting to Database");
        });

}
module.exports = {
    dbConnection
}