 ## Project Overview

This project sets up a basic Express.js server with a database connection and routing. It uses the `dotenv` package to load environment variables from a `.env` file.

## Step-by-Step Explanation

### 1. Importing Necessary Modules

The code starts by importing the required modules:

```javascript
var db = require('./database/db');
var route=require('./routers/routes');
const dotenv = require('dotenv')
dotenv.config()
```

- `db`: This is a custom module that handles database connections. It is imported from the `./database/db` path.
- `route`: This is another custom module that defines the routes for the API. It is imported from the `./routers/routes` path.
- `dotenv`: This module is used to load environment variables from a `.env` file.

### 2. Configuring Environment Variables

The code uses the `dotenv` module to load environment variables from a `.env` file. This is a common practice in Node.js to store sensitive information like database credentials outside of the codebase.

```javascript
dotenv.config()
```

### 3. Setting up the Express.js App

The code creates an Express.js app using the `express()` function:

```javascript
var app = express();
```

### 4. Using Middleware

The code uses the `bodyParser.json()` middleware to parse JSON requests:

```javascript
app.use(bodyParser.json())
```

It also uses the `cors()` middleware to enable Cross-Origin Resource Sharing (CORS), which allows the API to be accessed from different domains.

```javascript
app.use(cors())
```

### 5. Defining Routes

The code uses the `route.api(app)` function to define the routes for the API. This function is imported from the `./routers/routes` module.

```javascript
route.api(app)
```

### 6. Starting the Server

The code starts the server on the specified port using the `app.listen()` function:

```javascript
const port = process.env.PORT;
app.listen(port,() => {
    db.dbConnection();
    
    console.log("server is listening on"+"--"+port);

});
```

- `port`: This is the port on which the server will listen. It is loaded
from the `.env` file using `process.env.PORT`. If this environment variable is not set, it defaults to `8081
`.

 ## Todos App: Data Models and Schemas

This repository contains the data models and schemas for a simple Todos application. The application uses MongoDB as the database and Mongoose as the ORM (Object-Relational Mapping) library.



### Data Models

The application uses two data models:

- `todosModel.js`: This model represents a todo item. It has the following properties:
  - `todoId`: The unique identifier for the todo item.
  - `todos`: The actual todo item.
  - `userId`: The user who created the todo item.

- `userModel.js`: This model represents a user. It has the following properties:
  - `userId`: The unique identifier for the user.
  - `firstName`: The first name of the user.
  - `lastName`: The last name of the user.
  - `email`: The email address of the user.
  - `password`: The password of the user.

### Code Explanation

#### `todosModel.js`

The `todosModel.js` file defines the schema for the `todos` collection in MongoDB. The schema defines the structure of the documents in the collection and the data types of each field.

```javascript
const mongoose = require('mongoose')

let todosSchema = new mongoose.Schema({
    todoId:{
        type: String,
        required: true
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
```

#### `userModel.js`

The `userModel.js` file defines the schema for the `users` collection in MongoDB. The schema defines the structure of the documents in the collection and the data types of each field.

```javascript
let mongoose = require('mongoose');
let userRegisterSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    }
    ,firstName:{
        type: String,
        required


 # Node.js Express MongoDB CRUD Application

This is a Node.js Express MongoDB CRUD application that allows users to register, login, logout, create, read, update, and delete todos.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. Clone the repository:

```
git clone https://github.com/username/node-express-mongodb-crud-app.git
```

2. Install the dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/node-express-mongodb-crud-app
JWT_SECRET=your-secret-key
```

2. Replace `your-secret-key` with a strong secret key.

## Running the Application

1. Start the MongoDB server.

2. Run the following command to start the application:

```
npm start
```

## Usage

### User Registration

To register a new user, send a POST request to the `/api/users/register` endpoint with the following JSON body:

```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password"
}
```

### User Login

To log in a user, send a POST request to the `/api/users/login` endpoint with the following JSON body:

```
{
  "email": "john.doe@example.com",
  "password": "password"
}
```

### Logout

To log out a user, send a POST request to the `/api/users/logout` endpoint with the following JSON body:

```
{
  "id": "user-id"
}
```

### Create Todo

To create a new todo, send a POST request to the `/api/todos` endpoint with the following JSON body:

```
{
  "todos": "Buy groceries",
  "userId": "user-id"
}
```

### Get Todos

To get all todos for a user, send a GET request to the `/api/todos/:userId` endpoint.

### Delete Todo

To delete a todo, send a DELETE request to the `/api/deleteTodo/:todoId' endpoint.

### Update Todo

To update a todo, send a UPDATE request to the `/api/updateTodo/:todoId` endpoint.

 # Todo App with JWT Authentication

This is a simple todo app with JWT authentication. It uses Express.js as the web framework and MongoDB as the database.

## Installation

To install the dependencies, run the following command:

```
npm install
```

## Usage

To start the server, run the following command:

```
npm start
```

The server will listen on port 5000.

## API

The following API endpoints are available:

* `/api/register`: Registers a new user.
* `/api/login`: Logs in a user.
* `/api/logout`: Logs out a user.
* `/api/createTodo/:userId`: Creates a new todo for the specified user.
* `/api/getTodos/:userId`: Gets all todos for the specified user.
* `/api/updateTodo/:todoId`: Updates the specified todo.
* `/api/deleteUser/:todoId`: Deletes the specified todo.

## JWT Authentication

All endpoints except for `/api/register` and `/api/login` require JWT authentication. To obtain a JWT token, you must first register a user and then log in. The JWT token will be returned in the response body of the login endpoint.

To use the JWT token, you must include it in the `x-access-token` header of your requests.

## Code Explanation

### routes.js

The `routes.js` file defines the API endpoints.

```javascript
var controllers = require('../controllers/controller')
var jwt = require('../utils/auth')

function api(appExpress) {
  appExpress.post('/api/register', controllers.stuRegister)
  appExpress.post('/api/login', controllers.stuLogin)
  appExpress.post('/api/logout', controllers.logout)
  appExpress.post('/api/createTodo/:userId', jwt.verifyToken, controllers.createTodo)
  appExpress.get('/api/getTodos/:userId', jwt.verifyToken, controllers.getTodos)
  appExpress.put('/api/updateTodo/:todoId', jwt.verifyToken, controllers.updateTodos)
}