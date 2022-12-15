// Core
import React from 'react';
import PropTypes from 'prop-types';
// Style
import "./style.css";

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`
            button 
            ${props.size} 
            ${props.type}
            ${props.customClassName}
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
    customClassName: ''
};

Button.propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'large']),
    type: PropTypes.oneOf(['primary', 'secondary', 'disabled']),
    customClassName: PropTypes.string
};