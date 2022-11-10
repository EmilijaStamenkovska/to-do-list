require('./packages/db');
const config = require('./packages/config');
const todos = require('./handlers/todos');
const user = require('./handlers/user');
const express = require('express');
const bodyParser = require('body-parser');
const { expressjwt: jwtAuthentication } = require('express-jwt');

const api = express();
api.use(bodyParser.json());

const jwtOptions = {
    secret: 'secretpassword',
    algorithms: ['HS256']
};

api.use(
    jwtAuthentication(jwtOptions)
    .unless({
        path: [
            '/api/v1/todos/getAll',
            '/api/v1/todos/:id',
            '/api/v1/todos/finished',
            '/api/v1/todos/not-finished',
            '/api/v1/todos/create',
            '/api/v1/todos/delete/:id', 
            '/api/v1/user/login',
            '/api/v1/user/create-user',
            '/api/v1/user/update-user',
        ]
    }));

// Routes

// TODOS
api.post('/api/v1/todos/create', todos.create); // done
api.get('/api/v1/todos/getAll', todos.getAll); // done
api.get('/api/v1/todos/finished', todos.finished); // done
api.get('/api/v1/todos/not-finished', todos.notFinished); // done
api.get('/api/v1/todos/:id', todos.getOne); // done
api.put('/api/v1/todos/:id/update', todos.update);
api.delete('/api/v1/todos/delete/:id', todos.remove); // done

// USER
api.post('/api/v1/user/login', user.loginUser); // done
api.post('/api/v1/user/create-user', user.createUser); // done
api.get('/api/v1/user/getAll', user.getAll); // done
api.get('/api/v1/user/:id', user.getOne); // done
api.put('/api/v1/user/:id/update', user.updateUser);
api.delete('/api/v1/user/:id/delete', user.removeUser); // done

api.use(function (err, req, res) {
    if (err.username === 'UnauthorizedError') {
        res.status(401).send('Unauthorized JWT');
    }
});

api.listen(config.get('server').port, (error) => {
    if (error) {
        return console.error('Could not start server: ', error);
    }
    console.log(
        'Server successfully started on port: ',
        config.get('server').port
    );
});

module.exports = api;