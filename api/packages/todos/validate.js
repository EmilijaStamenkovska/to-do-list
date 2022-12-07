const { Validator } = require('node-input-validator');

const TodoCreate = {
    title: 'required'
};

const TodoUpdate = {
    title: 'required'
};

const validate = async(data, schema) => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = TodoCreate;
            break;
        case 'UPDATE':
            sch = TodoUpdate;
            break;
        default:
            break;
    }

    let v = new Validator(data, sch);
    let e = await v.check();

    if(!e) {
        throw v.errors;
    }
};

module.exports = {
    TodoCreate,
    TodoUpdate,
    validate
};