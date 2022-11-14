// Core
import React from 'react';
import PropTypes from 'prop-types';
// Style
import './style.css';

const ErrorMessage = (props) => {

    return (
        <span className="error-message">{props.errorMsg}</span>
    );
};

export default ErrorMessage;

ErrorMessage.defaultProps = {
    errorMsg: ''
};

ErrorMessage.propTypes = {
    errorMsg: PropTypes.string
};