const mongoose = require('mongoose');

const Todos = mongoose.model(
    'todos',
    {
        title: String,
        description: String,
        done: Number,
        not_done: Number,
        important: Number,
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

const createUnfinished = async (data) => {
    let todo = new Todos(data);
    return await todo.save();
};

const getAll = async () => {
    return await Todos.find({ _deleted: false }).sort('-_created');
};

const getNewest = async () => {
    return await Todos.find({ _deleted: false }).sort('_created');
};

const getByID = async (id) => {
    return await Todos.find({ _id: id, _deleted: false });
};

const update = async (id, data) => {
    return await Todos.updateOne({ _id: id, _deleted: false }, data);
};

const updateFinished = async (id) => {
    let data = await Todos.updateOne({ _id: id }, { done: 1, not_done: 0 });
    return data.nModified !== 0;
};

const updateUnfinished = async (id) => {
    let data = await Todos.updateOne({ _id: id }, { not_done: 1, done: 0 });
    return data.nModified !== 0;
};

const finished = async () => {
    return await Todos.find({ done: 1, not_done: 0, _deleted: false }).sort('-_created');
};

const not_finished = async () => {
    return await Todos.find({ done: 0, not_done: 1, _deleted: false }).sort('-_created');
};

const updateImportant = async (id) => {
    return await Todos.updateOne({ _id: id }, { important: 1 });
};

const important = async () => {
    return await Todos.find({ important: 1, _deleted: false }).sort('-_created');
};

const remove = async (id) => {
    let data = await Todos.updateOne({ _id: id, _deleted: false }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    create,
    createUnfinished,
    getAll,
    getNewest,
    updateImportant,
    important,
    getByID,
    update,
    updateFinished,
    updateUnfinished,
    finished,
    not_finished,
    remove
};