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
    let sch;

    switch (schema) {
        case 'CREATE':
            sch = UserCreate;
            break;
        case 'LOGIN':
            sch = UserLogin;
            break;
        case 'UPDATE': 
            sch = UserUpdate;
            break;
        
        default:
            break;
    }

    let v = new Validator(data, sch);
    let e = await v.check();
  
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    validate
};