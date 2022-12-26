const validator = require('../packages/todos/validate');
const todos = require('../packages/todos/index');

const create = async (req, res) => { 

    try {
        await validator.validate(req.body, 'CREATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('CREATE, Bad Request');
    }

    try {
        let data = await todos.create({
            uid: req.body._id,
            title: req.body.title,
            description: req.body.description,
            important: 0,
            done: 0,
            not_done: 1,
            _created: new Date().toISOString()
        });
        res.status(201).send(data);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Created, Bad Request');
    }
};

const getAll = async (req, res) => {

    try {
        let t = await todos.getAll();
        return res.status(200).send(t);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Cannot Get All Bad Request');
    }
};

const getNewest = async (req, res) => {

    try {
        let t = await todos.getNewest();
        return res.status(200).send(t);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Cannot Get All Bad Request');
    }
};

const getOne = async (req, res) => {

    try {
        let t = await todos.getByID(req.params.id);
        return res.status(200).send(t);
    } catch (err) {
        console.log(err);
        return res.status(404).send('Todo Not Found');
    }
};

const update = async (req, res) => {

    try {
        await validator.validate(req.body, 'UPDATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('UPDATE, Bad Request');
    }

    try {
        let updateTodo = await todos.update(req.params.id, req.body);

        if (!updateTodo) {
            return res.status(404).send('Todo Not Found');
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Updated, Bad Request');
    }
};

const updateFinishedTodo = async (req, res) => {

    try {
        let updateTodo = await todos.updateFinished(req.params.id);
        if (!updateTodo) {
            return res.status(404).send('Todo Not Found');
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Updated, Bad Request');
    }
};

const updateUnfinishedTodo = async (req, res) => {

    try {
        let updateTodo = await todos.updateUnfinished(req.params.id);

        if (!updateTodo) {
            return res.status(404).send('Todo Not Found');
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Updated, Bad Request');
    }
};


const updateImportantTodo = async (req, res) => {

    try {
        let updateTodo = await todos.updateImportant(req.params.id);

        if (!updateTodo) {
            return res.status(404).send('Todo Not Found');
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Updated, Bad Request');
    }
};


const finished = async (req, res) => {

    try {
        let ft = await todos.finished();
        if (!ft) {
            return res.status(404).send('Finished Todos Not Found');
        }
        return res.status(200).send(ft);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Finished Todos Bad Request');
    }
};

const notFinished = async (req, res) => {

    try {
        let nft = await todos.not_finished();
        if (!nft) {
            return res.status(404).send('Not Finished Todos Not Found');
        }
        return res.status(200).send(nft);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Not Finished Todos Bad Request');
    }
};

const important = async (req, res) => {
    try {
        let it = await todos.important();
        if(!it) {
            return res.status(404).send('Important Todos Not Found');
        }
        return res.status(200).send(it);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Important Todos Bad Request');
    }
};

const remove = async (req, res) => {

    try {
        const removeTodo = await todos.remove(req.params.id);
        if(removeTodo) {
            return res.status(204).send();
        }
        return res.status(404).send('Todo not found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    create,
    // createUnfinishedTodo,
    getAll,
    getNewest,
    getOne,
    update,
    finished,
    notFinished,
    important,
    remove,
    updateFinishedTodo,
    updateUnfinishedTodo,
    updateImportantTodo
};