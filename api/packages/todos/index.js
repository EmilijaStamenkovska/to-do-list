const mongoose = require('mongoose');

const Todos = mongoose.model(
    'todos',
    {
        uid: String,
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

const getAll = async (uid) => {
    return await Todos.find({ uid }, { _deleted: false }).sort('-_created');
};

const getNewest = async (uid) => {
    return await Todos.find({ uid }, { _deleted: false }).sort('_created');
};

const getByID = async (id) => {
    return await Todos.find({ _id: id, _deleted: false });
};

const update = async (id, data) => {
    return await Todos.updateOne({ _id: id, _deleted: false }, data);
};

const updateFinished = async (id) => {
    return await Todos.updateOne({ _id: id }, { done: 1, not_done: 0 });
};

const updateUnfinished = async (id) => {
    return await Todos.updateOne({ _id: id }, { not_done: 1, done: 0 });
};

const finished = async (uid) => {
    return await Todos.find({ done: 1, not_done: 0, uid: uid, _deleted: false }).sort('-_created');
};

const not_finished = async (uid) => {
    return await Todos.find({ done: 0, not_done: 1, uid: uid, _deleted: false }).sort('-_created');
};

const updateImportant = async (id) => {
    return await Todos.updateOne({ _id: id }, { important: 1 });
};

const important = async (uid) => {
    return await Todos.find({ important: 1, uid: uid, _deleted: false }).sort('-_created');
};

const remove = async (id) => {
    return await Todos.updateOne({ _id: id, _deleted: false }, { _deleted: true });
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