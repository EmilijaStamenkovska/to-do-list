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
            done: req.body.done,
            not_done: req.body.not_done,
            _created: new Date().toISOString()
        });
        
        res.status(201).send(data);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Created, Bad Request');
    }
};

const createUnfinishedTodo = async (req, res) => {
    try {
        await validator.validate(req.body, 'CREATE')
    } catch (err) {
        console.log(err);
        return res.status(400).send('CREATE, Bad Request');
    }

    try {
        let data = await todos.createUnfinished({
            uid: req.body._id,
            title: req.body.title,
            description: req.body.description,
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
        console.log(updateTodo);

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(400).send('Todo Not Updated, Bad Request');
    }
};


const updateUnfinishedTodo = async (req, res) => {

    try {
        let updateTodo = await todos.updateUnfinished(req.params.id);
        console.log(updateTodo);

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
            return res.status(404).send('Finished Todo Not Found');
        }
        return res.status(200).send(ft);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Finished Todo Bad Request');
    }
}

const notFinished = async (req, res) => {

    try {
        let nft = await todos.not_finished();
        if (!nft) {
            return res.status(404).send('Not Finished Todo Not Found');
        }
        return res.status(200).send(nft);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Not Finished Todo Bad Request');
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
    create, // works
    createUnfinishedTodo,
    getAll, // works
    getOne, // works
    update, // works
    finished, // works
    notFinished, // works
    remove, // works
    updateFinishedTodo,
    updateUnfinishedTodo
};