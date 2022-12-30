// Core
import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setPopupActivation, setPopupMessage } from '../../../services/redux/popup-reducer';
// UI
import Button from '../../ui/Button/index';
// Formats
import { dateFormat } from '../../../services/format/index';
// Rest
import { deleteTodo } from '../../../services/rest/todos';
// Style
import './style.css';

const OneTodoDetails = (props) => {
    const dispatch = useDispatch();

    const handlePopup = (msg) => {
        dispatch(setPopupActivation(true));
        dispatch(setPopupMessage(msg));
    };

    const handleImportantTodo = () => {
        props.updated(props._id);
        handlePopup("Task saved!");
    };

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(props._id);
            props.setState([...props.state.filter(t => t._id !== props._id)]);
            handlePopup("Changes saved!");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={`one-todo-details ${props.customClassName}`}>
            <Button customClassName="x" onClick={handleDeleteTodo}>྾</Button>
            {
                props.active ?
                    <Link
                        to={`${props._id}`}
                        className="one-todo-details__link"
                    >
                        <span className="one-todo-details__title">{props.title}</span>
                        <p className="one-todo-details__description">{props.description}</p>
                        <span className="one-todo-details__created">Created on: {dateFormat(props._created)}</span>
                    </Link>
                    :
                    <div className="one-todo-details__link">
                        <span className="one-todo-details__title">{props.title}</span>
                        <p className="one-todo-details__description">{props.description}</p>
                        <span className="one-todo-details__created">Created on: {dateFormat(props._created)}</span>
                    </div>
            }
            <>
                {
                    props.important === 0 ?
                        <Button
                            onClick={handleImportantTodo}
                            customClassName='important-button'
                        >
                            ✩ save
                        </Button>
                        :
                        <span
                            className='important-span__saved'
                        >
                            ✩ saved!
                        </span>
                }
            </>
        </div>
    );
};

export default OneTodoDetails;

OneTodoDetails.defaultProps = {
    title: '',
    description: '',
    _created: '',
    customClassName: '',
    state: [],
    setState: () => { },
    updated: () => { },
    important: 0,
    active: true
};

OneTodoDetails.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    _created: PropTypes.string,
    customClassName: PropTypes.string,
    state: PropTypes.array,
    setState: PropTypes.func,
    updated: PropTypes.func,
    important: PropTypes.number,
    active: PropTypes.bool
};