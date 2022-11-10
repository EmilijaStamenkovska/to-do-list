const fs = require('fs');

const configPath = `${__dirname}/../../config.json`;

let config;
try {
    let data = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(data);
} catch (err) {
    if (err.code !== 'ENOENT') throw err;
}

/**
 * This function checks if the wanted property key from the JS Object exists
 * in order to approach its value for further use.
 * If exists we'll access to it, if not it will return null.
 * 
 * @param {string} section  property key - from JS Object
 * @return {PropertyKey|null}  if key doesn't exist it will return null
 */
const get = (section) => {
    if (config[section]) {
        return config[section];
    }
    return null;
};

module.exports = {
    get
};