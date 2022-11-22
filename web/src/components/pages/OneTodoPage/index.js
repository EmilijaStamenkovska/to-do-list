import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dateFormat } from '../../../services/data/formats';
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { setDeleteTodo, setOneTodo } from '../../../services/redux/todos-reducer';
import { oneTodo, updateTodo } from '../../../services/rest/todos';
import PageTitle from '../../ui/PageTitle/index';
import Button from '../../ui/Button/index';
import { deleteTodo } from '../../../services/rest/todos';
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

    const saveTodo = async () => {
        try {
            let id = params.id;
            await updateTodo(id);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteOneTodo = async () => {
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
            <PageTitle title="My Task" />
            <div className="one-todo-page">
                <span className="one-todo-page__title">
                    {fields.title}
                </span>
                <span className="one-todo-page__created">
                    {dateFormat(fields._created)}
                </span>
                <p className="one-todo-page__description">
                    {fields.description}
                </p>
                <div className="one-todo-page__buttons">
                    {
                        !edit ?
                            <>
                                <Button
                                // onClick={editOneTodo}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="secondary"
                                    onClick={deleteOneTodo}
                                >
                                    Delete
                                </Button>
                            </> :
                            <>
                                <Button
                                // onClick={saveOneTodo}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="secondary"
                                    // onClick={cancelOneTodo}
                                >
                                    Cancel
                                </Button>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default OneTodoPage;