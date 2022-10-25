// Core
import React from 'react';
import PropTypes from 'prop-types'
// Styles
import './style.css';

const Input = (props) => {
    return (
        <div>
            <input
                className="input"
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                name={props.name}
            />
        </div>
    );
};

export default Input;

Input.defaultProps = {  
    value: () => { },
    onChange: () => { },
    type: '',
    name: ''
};

Input.propTypes = {
    value: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string
};