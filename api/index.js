require('./packages/db');
const cfg = require('./packages/config');
const todos = require('./handlers/todos');
const user = require('./handlers/user');
const express = require('express');
const bodyParser = require('body-parser');
const { expressjwt: jwtAuthentication } = require('express-jwt');
const cors = require('cors');

const api = express();
api.use(bodyParser.json());
api.use(cors());

const jwtOptions = {
    secret: cfg.get('security').jwt_key,
    algorithms: cfg.get('security').algorithm,
};

api.use(
    jwtAuthentication(jwtOptions)
    .unless({
        path: [
            '/api/v1/user/create-user',
            '/api/v1/user/login'
        ]
    }));

// Requests

// TODOS
api.post('/api/v1/todos/create', todos.create);
api.get('/api/v1/todos/getAll', todos.getAll);
api.get('/api/v1/todos/get-newest', todos.getNewest);
api.get('/api/v1/todos/finished', todos.finished);
api.get('/api/v1/todos/not-finished', todos.notFinished);
api.get('/api/v1/todos/important', todos.important);
api.get('/api/v1/todos/:id', todos.getOne);
api.put('/api/v1/todos/:id/update', todos.update);
api.patch('/api/v1/todos/:id/update-finished', todos.updateFinishedTodo);
api.patch('/api/v1/todos/:id/update-unfinished', todos.updateUnfinishedTodo);
api.patch('/api/v1/todos/:id/update-important', todos.updateImportantTodo);
api.delete('/api/v1/todos/delete/:id', todos.remove);

// USER
api.post('/api/v1/user/login', user.loginUser);
api.post('/api/v1/user/create-user', user.createUser);
api.get('/api/v1/user/getAll', user.getAll);
api.get('/api/v1/user/:id', user.getOne);
api.put('/api/v1/user/:id/update', user.updateUser);
api.post('/api/v1/user/:id/check-password', user.checkPassword);
api.delete('/api/v1/user/:id/delete', user.removeUser);

api.use(function (err, req, res, next) {
    if (err.username === 'UnauthorizedError') {
        res.status(401).send('Unauthorized JWT');
    }
});

api.listen(cfg.get('server').port, (error) => {
    if (error) {
        return console.error('Could not start server: ', error);
    }
    console.log(
        'Server successfully started on port: ',
        cfg.get('server').port
    );
});

module.exports = api;