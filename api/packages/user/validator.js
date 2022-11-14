const { Validator } = require('node-input-validator');

const UserCreate = {
    username: 'required|minLength:1',
    email: 'required|email',
    password: 'required|minLength:2'
};

const UserLogin = {
    email: 'required|email',
    password: 'required|minLength:2'
};

const UserUpdate = {
    username: 'required|minLength:1',
    email: 'required|email',
    password: 'required|minLength:2'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check();
  
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    UserCreate,
    UserLogin,
    UserUpdate
};