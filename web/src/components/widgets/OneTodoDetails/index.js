// Core
import React from 'react'
import PropTypes from 'prop-types';
// Style
import './style.css';

const OneTodoDetails = (props) => {

    return (
        <div className={`one-todo-details ${props.customClassName}`}>
            <span className="one-todo-details__title">Title: {props.title}</span>
            <span className="one-todo-details__description">{props.description}</span>
            <span>Created on: <br /> {props._created}</span>
        </div>
    );
};

export default OneTodoDetails;

OneTodoDetails.defaultProps = {
    title: '',
    description: '',
    _created: '',
    customClassName: ''
};

OneTodoDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string
};