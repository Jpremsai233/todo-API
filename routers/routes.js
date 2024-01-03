var controllers= require('../controllers/controller')
var jwt=require('../utils/auth')


function api(appExpress){
appExpress.post('/api/register',controllers.stuRegister)
appExpress.post('/api/login',controllers.stuLogin)
appExpress.post('/api/logout',controllers.logout)
appExpress.post('/api/createTodo/:userId', jwt.verifyToken, controllers.createTodo)
appExpress.get('/api/getTodos/:userId',jwt.verifyToken,controllers.getTodos)
appExpress.put('/api/updateTodo/:userId/:todoId', jwt.verifyToken, controllers.updateTodos)
appExpress.delete('/api/deleteTodo/:todoId',jwt.verifyToken,controllers.deleteTodo)



}
module.exports={
    api
}