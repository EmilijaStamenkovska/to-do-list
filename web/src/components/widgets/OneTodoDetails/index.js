// Core
import React from 'react'
import PropTypes from 'prop-types';
// UI
import Button from '../../ui/Button/index';
// Formats
import { dateFormat } from '../../../services/format/index';
// Style
import './style.css';

const OneTodoDetails = (props) => {

    return (
        <div className={`one-todo-details ${props.customClassName}`}>
            <span className="one-todo-details__title">{props.title}</span>
            {/* <span className="one-todo-details__description">{props.description}</span> */}
            <span>Created on: <br /> {dateFormat(props._created)}</span>
            <div className="one-todo-details__buttons">
                <Button
                    customClassName="custom-button"
                >
                    done
                </Button>
                <Button
                    customClassName="custom-button"
                >
                    not-done
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
    customClassName: ''
};

OneTodoDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string
};