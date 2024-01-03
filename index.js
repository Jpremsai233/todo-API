var db = require('./database/db');
var route=require('./routers/routes');
const dotenv = require('dotenv')
dotenv.config()

var express = require('express');
const cors = require('cors')

var app = express();

var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(cors())
route.api(app)
const port = process.env.PORT;
app.listen(port,() => {
    db.dbConnection();
    
    console.log("server is listening on"+"--"+port);

});