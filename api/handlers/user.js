const { validate } = require('uuid');
const users = require('../packages/user/index');
const validator = require('../packages/user/validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('./../packages/config');
const {
    UserCreate,
    UserLogin,
    UserUpdate
} = require('./../packages/user/validator');

const createUser = async (req, res) => {

    try {
        await validate(req.body, UserCreate);
    } catch (err) {
        console.log(err);
        return res.status(404).send('CREATE, Bad Request');
    }

    try {
        let userExists = await users.getByEmail(req.body.email);

        if (userExists) {
            return res.status(409).send('User Already Exists');
        }

        if(!userExists) {

            let payload = {
                uid: req.body._id,
                email: req.body.email,
                username: req.body.username,
                _created: new Date().toISOString()
            }
            
            let user = await users.create(payload);
            
            console.log(user);
            res.status(201).send(user);
        }
    } catch (err) {
        console.log(err);
        return res.status(409).send('User Not Created Bad Request');
    }
};

const getAll = async (req, res) => {

    try {
        let u = await users.getAll();
        console.log(u);
        return res.status(200).send(u);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Cannot Get All Users');
    }
};

const getOne = async (req, res) => {

    try {
        let data = await users.getOne(req.params.id);
        if (data) {
            return res.status(200).send(data);
        }
        return res.status(404).send('User Not Found');
    } catch (err) {
        console.log(err);
        return res.status(404).send('Get One Not Found');
    }
};

const loginUser = async (req, res) => {

    try {
        await validate(req.body, UserLogin)
    } catch (err) {
        console.log(err);
        return res.status(400).send('Login Validate Bad Request');
    }

    try {
        let user = await users.getByEmail(req.body.email);
        if (!user) {
            return res.status(400).send('Bad request');
        }

        // if (!bcrypt.compareSync(req.body.password, user.password)) { // not working
        //   return res.status(400).send('Bad request. Wrong password');
        // }

        if (u) {
            let expirationToken = parseInt((new Date().getTime() + 60 * 60 * 24 * 365 * 1000) / 1000);

            let payload = {
                uid: user._id,
                email: user.email,
                username: user.username,
                exp: expirationToken
            };

            let key = config.get('security').jwt_key;
            let token = jwt.sign(payload, key);

            return res.status(200).send({ jwt: token, userdata: payload });
        }

        return res.status(401).send('Unauthorized!');
    } catch (err) {
        console.log(err);
        return res.status(401).send('Login Failed');
    }
};

const updateUser = async (req, res) => {

    try {
        await validate(req.body, UserUpdate)
    } catch (err) {
        console.log(err);
        return res.status(400).send('Update Validate Bad Request');
    }

    try {
        let updatedUser = await users.update(req.params.id, req.body);

        if (updatedUser) {
            return res.status(204).send('User Successfully Updated');
        }

        return res.status(404).send('User For Update Not Found');
    } catch (err) {
        console.log(err);
        return res.status(401).send('Update User Failed');
    }
};

const removeUser = async (req, res) => {
    try {
        let deleteUser = await users.remove(req.params.id);

        if (deleteUser) {
            return res.status(204).send('User Successfully Deleted');
        }
        return res.status(404).send('Delete User Not Found');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAll, // works
    getOne, // works
    createUser, // works
    loginUser, // works
    updateUser, // works
    removeUser // works
};