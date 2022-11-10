const mongoose = require('mongoose');
const cfg = require('../config');

let username = cfg.get('db').username;
let password = cfg.get('db').password;
let dbname = cfg.get('db').dbname;
let host = cfg.get('db').host;

let dsn = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`

/**
 * With dsn - coonection string we connect to cluster and access to the mongodb cloud.
 * If there is an error it will return the error and print it in the console.log
 */
mongoose.connect(
    dsn,
    err => {
        if (err) {
            return console.log('Could not connect to database: ', err);
        }
        console.log('Successfully connected to database');
    }
);
