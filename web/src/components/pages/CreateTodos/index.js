// Core
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// UI
import PageTitle from '../../ui/PageTitle/index';
import Input from '../../ui/Input/index';
import Button from '../../ui/Button';
// Redux
import { useDispatch } from 'react-redux';
import { setOneTodo } from '../../../services/redux/todos-reducer';
// Rest
import { createTodo } from '../../../services/rest/todos';
// Data
import { EMPTY_FIELD, MIN_LENGTH } from '../../../services/data/errors/client';
import { todosErrorsInit } from '../../../services/data/inits/errors';
import { todosFieldsInit } from '../../../services/data/inits/fields';
// Style
import './style.css';

const CreateTodosPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [fields, setFields] = useState(todosFieldsInit);
    const [error, setError] = useState(todosErrorsInit);

    const onChangeHandler = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }); };

    const validate = () => {
        setError(todosErrorsInit);
        let error = false;

        if (fields.title.length === 0) {
            setError(prevstate => ({ ...prevstate, title: { errorMessage: EMPTY_FIELD } }));
            error = true;
        }
        if (fields.title.length < 5 && fields.title.length > 0) {
            setError(prevstate => ({ ...prevstate, title: { errorMessage: MIN_LENGTH } }));
            error = true;
        }
        return error;
    };

    const submitTodo = async () => {
        if (validate()) {
            return;
        }

        try {
            let body = await createTodo(
                fields.title, 
                fields.description, 
                fields.done, 
                fields.not_done
            );
            dispatch(setOneTodo(body))
            navigate('/my-profile');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>  
            <PageTitle title="Create a task" />
            <div className="create-todos">
                <Input
                    placeholder="...and eat a cookie 🍪"
                    value={fields.title}
                    onChange={onChangeHandler}
                    type="title"
                    name="title"
                    error={error.title}
                />
                <textarea
                    onChange={onChangeHandler}
                    placeholder="...✎"
                    value={fields.description}
                    type="description"
                    name="description"
                    className="create-todos__input"
                >
                </textarea>
                <Button
                    type="secondary"
                    onClick={submitTodo}
                >
                    Create task
                </Button>
            </div>
        </>
    );
};

export default CreateTodosPage;
