// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteTodo, setOneTodo, setOneTodoUpdate } from '../../../services/redux/todos-reducer';
import { setPopupActivation, setPopupMessage } from '../../../services/redux/popup-reducer';
// UI
import PageTitle from '../../ui/PageTitle/index';
import Button from '../../ui/Button/index';
import Input from '../../ui/Input/index';
// Services
import { oneTodo, updateTodo } from '../../../services/rest/todos';
import { deleteTodo } from '../../../services/rest/todos';
// Data
import { EMPTY_FIELD, MIN_LENGTH } from '../../../services/data/errors/client';
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { todosErrorsInit } from '../../../services/data/inits/errors';
// Style
import './style.css';

const OneTodoPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    let id = params.id;
    const todo = useSelector(state => state.todos.todo_body);
console.log(todo)
    const [fields, setFields] = useState(todosFieldsInit);
    const [error, setError] = useState(todosErrorsInit);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [fetch, setFetch] = useState(false);
    const [edit, setEdit] = useState(false);

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
                _deleted: todo_data._deleted
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditTodo = () => {
        setEdit(state => !state);
    };

    const handlePopupDelete = () => {
        dispatch(setPopupActivation(true));
        dispatch(setPopupMessage("Task deleted!"));
    };

    const handlePopup = () => {
        dispatch(setPopupActivation(true));
        dispatch(setPopupMessage("Task updated!"));
    };

    const validate = () => {
        setError(todosErrorsInit);
        let error = false;

        if (title.length === 0) {
            setError(prevstate => ({ ...prevstate, title: { errorMessage: EMPTY_FIELD } }));
            error = true;
        }
        if (title.length < 5 && title.length > 0) {
            setError(prevstate => ({ ...prevstate, title: { errorMessage: MIN_LENGTH } }));
            error = true;
        }
        return error;
    };

    const submitEdit = async () => {
        if (validate()) {
            return;
        }
        try {
            await updateTodo(id, title, description);
            dispatch(setOneTodoUpdate({
                title: title,
                description: description
            }))
            setFetch(!fetch);
            handlePopup();
            handleEditTodo();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(id);
            dispatch(setDeleteTodo(id));
            setFetch(!fetch);
            handlePopupDelete();
            navigate('/my-tasks');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOneTodo();
    }, [fetch]);

    return (
        <>
            <div className="one-todo-page">
                {
                    !edit
                        ?
                        <PageTitle title={fields.title} />
                        :
                        <Input
                            placeholder={fields.title}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="title"
                            name="title"
                            error={error.title}
                        />
                }
                <Link
                    className="one-todo-page__title"
                    to={(-1)}
                >
                    ⤺
                </Link>
                {
                    !edit
                        ?
                        <p className={`${fields.description === "" ? 'one-todo-page__description_display-none' : 'one-todo-page__description'} `}>
                            {fields.description}
                        </p>
                        :
                        <textarea
                            placeholder={fields.description}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="description"
                            name="description"
                            error={error.description}
                            className="one-todo-page__description active"
                        />
                }
                <div className="one-todo-page__buttons">
                    <Button
                        onClick={!edit ? handleEditTodo : submitEdit}
                        type="secondary"
                    >
                        {`${!edit ? "edit" : "save"}`}
                    </Button>
                    <Button
                        onClick={!edit ? handleDeleteTodo : handleEditTodo}
                    >
                        {`${!edit ? "delete" : "cancel"}`}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default OneTodoPage;