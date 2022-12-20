// Core
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// UI
import Button from '../../ui/Button/index';
// Formats
import { dateFormat } from '../../../services/format/index';
// Rest
import { deleteTodo } from '../../../services/rest/todos';
// Style
import './style.css';

const OneTodoDetails = (props) => {

    const done = () => {
        props.finished(props._id);
    };

    const notDone = () => {
        props.unfinished(props._id)
    };

    const handleDeleteTodo = async () => {
        if (window.confirm('Delete task?')) {
            try {
                await deleteTodo(props._id);
                alert('Task deleted!');
                props.setState([...props.state.filter(t => t._id !== props._id)]);
            } catch (err) {
                console.log(err);
            }
        } else {
            return;
        }
    };
    

    return (
        <div className={`one-todo-details ${props.customClassName}`}>
            <Button customClassName="x" onClick={handleDeleteTodo}>྾</Button>
            <Link
                to={`${props._id}`}
                className="one-todo-details__link"
            >
                <span className="one-todo-details__title">{props.title}</span>
                <span className="one-todo-details__created">Created on: {dateFormat(props._created)}</span>
            </Link>
            <div className="one-todo-details__buttons">
                <Button
                    customClassName="custom-button"
                    onClick={done}
                    type={props.buttonTypeF ? "disabled" : ""} // change this
                >
                    done
                </Button>
                <Button
                    customClassName="custom-button"
                    onClick={notDone}
                    type={props.buttonTypeU ? "disabled" : ""} // change this
                >
                    not done
                </Button>
            </div>
        </div>
    );
};

export default OneTodoDetails;

OneTodoDetails.defaultProps = {
    title: '',
    description: '',
    _created: '',
    customClassName: '',
    finished: () => {},
    unfinished: () => {},
    buttonTypeF: false,
    buttonTypeU: false,
    state: () => {},
    setState: () => {}
};

OneTodoDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string,
    finished: PropTypes.func,
    buttonTypeF: PropTypes.bool,
    buttonTypeU: PropTypes.bool,
    state: PropTypes.func,
    setState: PropTypes.func
};