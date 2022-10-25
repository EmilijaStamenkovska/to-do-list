// Core
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Style
import './style.css';

const Checkbox = (props) => {

    return (
        <input
            className="checkbox"
            type="checkbox"
            name="checkbox"
            disabled={props.disabled}
            onChange={props.onChange}
        />
    )
};

export default Checkbox;