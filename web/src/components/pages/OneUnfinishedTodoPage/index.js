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
import { deleteTodo, oneTodo, updateFinishedTodos } from '../../../services/rest/todos';
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

    const handleEditTodo = async () => {
        console.log('x')
    };

    const handleUpdateTodo = async () => {
        if (window.confirm('Send task to finished?')) { //demo
            try {
                let id = params.id;
                await updateFinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
            alert('Task sent to finished!'); //demo
            navigate('/unfinished-tasks');
        } else {
            return;
        }
    };

    const handleDeleteTodo = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                let id = params.id;
                await deleteTodo(id);
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
                            onClick={handleEditTodo}
                            type="secondary"
                            customClassName="custom-btn__finish"
                        >
                            Edit?
                        </Button>
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
                    <p className="one-unfinished-todo-page__description">
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
