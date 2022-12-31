// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setDeleteTodo, setOneTodo } from '../../../services/redux/todos-reducer';
import { setPopupActivation, setPopupMessage } from '../../../services/redux/popup-reducer';
// UI
import Button from '../../ui/Button';
import PageTitle from '../../ui/PageTitle';
// Services 
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { dateFormat } from '../../../services/format';
import { deleteTodo, oneTodo, updateFinishedTodos } from '../../../services/rest/todos';
// Data
import { CHANGES_SAVED, TASK_DELETED } from '../../../services/data/popup';
// Style
import './style.css';

const OneUnfinishedTodoPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    let id = params.id;

    const [fields, setFields] = useState(todosFieldsInit);
    const [fetch, setFetch] = useState(false);

    const getOneTodo = async () => {
        try {
            let data = await oneTodo(id);
            let todo_data = data.find(state => state._id === id);

            setFields(todo_data);
            dispatch(setOneTodo({
                title: todo_data.title,
                description: todo_data.description,
                _id: todo_data._id,
                _created: todo_data._created,
                _deleted: todo_data._deleted,
                not_done: 1
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateTodo = async () => {
        try {
            await updateFinishedTodos(id);
            dispatch(setPopupActivation(true));
            dispatch(setPopupMessage(CHANGES_SAVED));
            navigate('/unfinished-tasks');
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(id);
            dispatch(setDeleteTodo(id));
            setFetch(!fetch);
            dispatch(setPopupActivation(true));
            dispatch(setPopupMessage(TASK_DELETED));
            navigate('/unfinished-tasks');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOneTodo();
    }, [fetch]);

    return (
        <>
            <PageTitle title={fields.title} />
            <div className="one-unfinished-todo-page">
                <Link
                    className="one-unfinished-todo-page__title"
                    to="/unfinished-tasks"
                >
                    back to unfinished tasks
                </Link>
                <div className="one-unfinished-todo-page__first-wrapper">
                    <div className="one-unfinished-todo-page__second-wrapper">
                        <Button
                            onClick={handleUpdateTodo}
                            type="secondary"
                            customClassName="custom-btn__finish"
                        >
                            Done?
                        </Button>
                        <Button
                            onClick={handleDeleteTodo}
                            type="secondary"
                            customClassName="custom-btn__finish"
                        >
                            Delete?
                        </Button>
                    </div>
                    <div className="one-unfinished-todo-page__description">
                        <span>{fields.title}</span>
                        <span>Created on: {dateFormat(fields._created)}</span>
                        <p>{fields.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneUnfinishedTodoPage;
