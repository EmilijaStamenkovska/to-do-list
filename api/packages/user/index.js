const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    {
        username: String,
        email: String,
        password: String,
        _created: Date,
        _deleted: {
            type: Boolean,
            default: false
        },
        verification_token: String
    },
    'users'
);

const create = async (data) => {
    let user = new User(data);
    return await user.save();
};

const getOne = async (id) => {
    return await User.findOne({_deleted: false, _id: id});
};

const getAll = async () => {
    return await User.find({ _deleted: false });
};

const getByEmail = async (email) => {
    return await User.findOne({ email: email, _deleted: false });
};

const update = async (id, userdata) => {
    let data = await User.updateOne({ _id: id, _deleted: false }, userdata);
    return data.nModified !== 0;
}

const remove = async (id) => {
    let data = await User.updateOne({ _id: id, _deleted: false }, { _deleted: true });
    return data.nModified !== 0;
};

module.exports = {
    create, 
    getAll,
    getOne,
    getByEmail,
    update,
    remove
};