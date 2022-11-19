import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { dateFormat } from '../../../services/data/formats';
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { setDeleteTodo, setOneTodo } from '../../../services/redux/todos-reducer';
import { oneTodo } from '../../../services/rest/todos';
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

    const getOneTodo = async () => {
        try {
            let id = params.id;
            let data = await oneTodo(id);
            let todo_data = data.find(state => state._id === id);

            setFields(todo_data);
            dispatch(setOneTodo({
                title: todo_data.title,
                description: todo_data.description
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteOneTodo = async () => {
        //  if (window.confirm('Are you sure you want to delete this task?')) {
        try {
            let id = params.id;
            await deleteTodo(id);
            // dispatch(setDeleteTodo(id));
            // setFetch(!fetch);
            // navigate('/my-tasks');
        } catch (err) {
            console.log(err);
        }
      //  }
    };

    useEffect(() => {
        getOneTodo();
    }, []);


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
                    <Button
                    // onClick={editTodo}
                    >
                        Edit Task
                    </Button>
                    <Button
                        type="secondary"
                        onClick={deleteOneTodo}
                    >
                        Delete Task
                    </Button>
                </div>
            </div>
        </>
    );
};

export default OneTodoPage;