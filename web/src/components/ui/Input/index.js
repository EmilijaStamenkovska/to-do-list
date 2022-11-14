// Core
import React from 'react';
import PropTypes from 'prop-types'
// Styles
import './style.css';

const Input = (props) => {
    return (
        <label>
            <input
                className={`
                form-input__field
                ${props.customClassName}
                ${props.error.errorMessage ? 'error' : null} // ?
                `}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                name={props.name}
                error={props.error}
            />
            {
                props.error?.errorMessage
                    ?
                    <span className='form-input__field__error-span'>
                        {props.error.errorMessage} 
                    </span>
                    :
                    null
            }
        </label>
    );
};

export default Input;

Input.defaultProps = {
    value: '',
    onChange: () => { },
    type: '',
    name: '',
    placeholder: '',
    error: {},
    customClassName: ''
};

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.object,
    customClassName: PropTypes.string
};