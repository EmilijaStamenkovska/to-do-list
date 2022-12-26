// Core
import React from 'react';
import PropTypes from 'prop-types';
// Style
import "./style.css";

const Button = (props) => {
    return (
        <button
            disabled={props.disabled}   
            onClick={props.onClick}
            className={`
            button 
            ${props.size} 
            ${props.type}
            ${props.customClassName}
            ${props.disabled ? "btn-dsb" : ""}
            `}
        >
            {props.children}
        </button>
    )
};

export default Button;

Button.defaultProps = {
    onClick: () => { },
    size: "small",
    type: "primary",
    customClassName: '',
    disabled: false
};

Button.propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'disabled', '']),
    customClassName: PropTypes.string,
    disabled: PropTypes.bool
};