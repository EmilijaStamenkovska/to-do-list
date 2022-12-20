// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setDeleteTodo, setOneTodo } from '../../../services/redux/todos-reducer';
// UI
import Button from '../../ui/Button';
import PageTitle from '../../ui/PageTitle';
// Services 
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { dateFormat } from '../../../services/format';
import { deleteTodo, oneTodo, updateUnfinishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const OneFinishedTodoPage = () => {
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
                title: fields.title,
                description: todo_data.description,
                _id: todo_data._id,
                _created: todo_data._created,
                _deleted: todo_data._deleted,
                done: 1,
                not_done: 0
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateTodo = async () => {
        if (window.confirm('Send task to unfinished?')) {
            try {
                await updateUnfinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
            alert('Task sent to unfinished!');
            navigate('/finished-tasks');
        } else {
            return;
        }
    };

    const handleDeleteTodo = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTodo(id);
                dispatch(setDeleteTodo(id));
                setFetch(!fetch);
                navigate('/finished-tasks');
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        getOneTodo();
    }, [fetch]);

    return (
        <>
            <PageTitle title={fields.title} />
            <div className="one-finished-todo-page">
                <Link
                    className="one-finished-todo-page__title"
                    to="/finished-tasks"
                >
                    back to finished tasks
                </Link>
                <div className="one-finished-todo-page__first-wrapper">
                    <div className="one-finished-todo-page__second-wrapper">
                        <span className="one-finished-todo-page__task-completed">
                            This task is completed! ッ
                        </span>
                        <Button
                            onClick={handleUpdateTodo}
                            customClassName="one-finished-todo-page__create-task"
                        >
                            Not done?
                        </Button>
                        <Link
                            to="/create-tasks"
                            className="one-finished-todo-page__create-task"
                        >
                            Create new?

                        </Link>
                        <Button
                            onClick={handleDeleteTodo}
                            customClassName="one-finished-todo-page__create-task"
                        >
                            Delete?
                        </Button>
                    </div>
                    <p className="one-finished-todo-page__description">
                        {fields.title}
                        <br />
                        Created on: {dateFormat(fields._created)}
                        <br />
                        <br />
                        {fields.description}
                        <br />
                    </p>
                </div>
            </div>
        </>
    );
};

export default OneFinishedTodoPage;
