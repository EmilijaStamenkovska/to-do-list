// Core
import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// UI
import Button from '../../ui/Button/index';
// Formats
import { dateFormat } from '../../../services/format/index';
// Style
import './style.css';

const OneTodoDetails = (props) => {

    const onDone = () => {
        props.finished(props._id);
    };

    const onNotDone = () => {
        props.unfinished(props._id)
    };
    return (
        <div className={`one-todo-details ${props.customClassName}`}>
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
                    onClick={onDone}
                    type={props.buttonTypeF ? "disabled" : ""}
                >
                    done
                </Button>
                <Button
                    customClassName="custom-button"
                    onClick={onNotDone}
                    type={props.buttonTypeU ? "disabled" : ""}
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
    buttonTypeU: false
    
};

OneTodoDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string,
    finished: PropTypes.func,
    buttonTypeF: PropTypes.bool,
    buttonTypeU: PropTypes.bool
};