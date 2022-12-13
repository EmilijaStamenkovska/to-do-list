// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setOneTodo } from '../../../services/redux/todos-reducer';
// UI
import PageTitle from '../../ui/PageTitle/index';
import Button from '../../ui/Button/index';
import Input from '../../ui/Input/index';
// Rest
import { oneTodo, updateTodo } from '../../../services/rest/todos';
import { deleteTodo } from '../../../services/rest/todos';
// Data
import { todosFieldsInit } from '../../../services/data/inits/fields';
// Style
import './style.css';

const OneTodoPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [fields, setFields] = useState(todosFieldsInit);
    const [fetch, setFetch] = useState(false);
    const [edit, setEdit] = useState(false);

    const getOneTodo = async () => {
        try {
            let id = params.id;
            let data = await oneTodo(id);
            let todo_data = data.find(state => state._id === id);

            setFields(todo_data);
            dispatch(setOneTodo({
                title: todo_data.title,
                description: todo_data.description,
                _id: todo_data._id,
                _created: todo_data._created,
                _deleted: todo_data._deleted
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }) };

    const handleEditTodo = () => {
        setEdit(state => !state);
    };

    const handleUpdateTodo = async () => {
        try {
            let id = params.id;
            let data = await updateTodo(id, fields.title, fields.description);
            let todo_data = data.find(state => state._id === id);
            console.log(todo_data);
            let a = setFields(todo_data);
            console.log(a);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTodo = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                let id = params.id;
                await deleteTodo(id);
                setFetch(!fetch);
                navigate('/my-tasks');
            } catch (err) {
                console.log(err);
            }
        };
    };

    useEffect(() => {
        getOneTodo();
    }, [fetch]);

    return (
        <>
            <PageTitle title={fields.title} />
            <div className="one-todo-page">
                {
                    !edit ?
                        <>
                            <Link
                                className="one-todo-page__title"
                                to="/my-tasks"
                            >
                                back to all tasks
                            </Link>
                            <p className={`
                            ${fields.description === "" ?
                                    'one-todo-page__description_display-none' :
                                    'one-todo-page__description'}
                            `}>
                                {fields.description}
                            </p>
                            <div className="one-todo-page__buttons">
                                <Button
                                    onClick={handleEditTodo}
                                    type="secondary"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={handleDeleteTodo}
                                >
                                    Delete
                                </Button>
                            </div>
                        </> :
                        <>
                            <Input
                                placeholder={fields.title}
                                value={fields.title}
                                onChange={handleChange}
                                type="title"
                                name="title"
                            />
                            <textarea
                                placeholder={fields.description}
                                value={fields.description}
                                onChange={handleChange}
                                type="description"
                                name="description"
                            />
                            <div className="one-todo-page__buttons">
                                <Button
                                    type="primary"
                                    onClick={handleUpdateTodo}
                                >
                                    Finish
                                </Button>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default OneTodoPage;