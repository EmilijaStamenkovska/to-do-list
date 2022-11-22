const mongoose = require('mongoose');

const Todos = mongoose.model(
    'todos',
    {
        title: String,
        description: String,
        done: Number,
        not_done: Number,
        _created: Date,
        _deleted: {
            type: Boolean,
            default: false
        }
    },
    'todos'
);

const create = async (data) => {
    let todo = new Todos(data);
    return await todo.save();
};

const getAll = async () => {
    return await Todos.find({ _deleted: false }).sort('-_created');
};

const getByID = async (id) => {
    return await Todos.find({ _id: id, deleted: false });
};

const update = async (id, data) => {
    return await Todos.updateOne({ _id: id, deleted: false }, data);
};

const finished = async () => {
    return await Todos.find({ done: 1, not_done: 0 });
};

const not_finished = async () => {
    return await Todos.find({ done: 0, not_done: 1 });
};

const remove = async (id) => {
    let data = await Todos.updateOne({ _id: id, _deleted: false }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    create,
    getAll,
    getByID,
    update,
    finished,
    not_finished,
    remove
};