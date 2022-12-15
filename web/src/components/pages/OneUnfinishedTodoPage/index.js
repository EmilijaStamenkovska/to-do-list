// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setOneTodo } from '../../../services/redux/todos-reducer';
// UI
import Button from '../../ui/Button';
import PageTitle from '../../ui/PageTitle';
// Services 
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { dateFormat } from '../../../services/format';
import { oneTodo, updateUnfinishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const OneUnfinishedTodoPage = () => {
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

    const sendToFinishedTodos = async (id) => {
        try {
            await updateUnfinishedTodos(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTodo = async () => {
        console.log('x')
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
                            type="secondary"
                            customClassName="custom-btn__finish first"
                        >
                            Edit task?
                        </Button>
                        <Button
                            onClick={sendToFinishedTodos}
                            type="secondary"
                            customClassName="custom-btn__finish"
                        >
                            Finished?
                        </Button>
                    </div>
                    <p className={`
                            ${fields.description === "" ?
                            "one-unfinished-todo-page__description_display-none" :
                            "one-unfinished-todo-page__description"}
                        `}>
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

export default OneUnfinishedTodoPage;
