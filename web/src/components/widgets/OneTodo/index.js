// Core
import React from 'react';
import PropTypes from 'prop-types';
// Widgets
import OneTodoDetails from '../OneTodoDetails';
// Style
import './style.css';

const OneTodo = (props) => {

    return (
        <div className="one-todo">
            <OneTodoDetails
                title={props.title}
                description={props.description}
                _created={props._created}
                className={`one-todo-details ${props.customClassName}`}
                finished={props.finished}
                unfinished={props.unfinished}
            />
        </div>
    );
};

export default OneTodo;

OneTodo.defaultProps = {
    _id: '',
    title: '',
    description: '',
    _created: '',
    customClassName: ''
};

OneTodo.propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string
};