// Core
import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../services/redux/reducers';
// UI
import ErrorMessage from '../../ui/ErrorMessage';
import Button from '../../ui/Button';
import PageTitle from '../../ui/PageTitle';
import Input from '../../ui/Input';
// Auth
import { createUser } from '../../../services/rest/users/auth';
// Validation
import { EMAIL_VALIDATOR, PASSWORD_VALIDATOR } from '../../../services/data/validators';
// Data
import { fieldsInit } from '../../../services/data/inits/fields/index';
import { errorsInit } from '../../../services/data/inits/errors/index';
import { EMPTY_FIELD, INVALID_EMAIL, INVALID_PASSWORD } from '../../../services/data/errors/client';
// Rest
import { handleServerError } from '../../../services/rest/errors/server';
// Style
import './style.css';

const CreateUserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fields, setFields] = useState(fieldsInit);
    const [error, setError] = useState(errorsInit);
    const [serverError, setServerError] = useState('');

    const onChangeHandler = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }); };

    const validate = () => {
        setError(errorsInit);
        let errors = false;

        if (fields.username.length === 0) {
            setError(prevstate => ({ ...prevstate, username: { errorMessage: EMPTY_FIELD } }));
            errors = true;
        }
        if (fields.email.length === 0) {
            setError(prevstate => ({ ...prevstate, email: { errorMessage: EMPTY_FIELD } }));
            errors = true;
        }
        if (fields.password.length === 0) {
            setError(prevstate => ({ ...prevstate, password: { errorMessage: EMPTY_FIELD } }));
            errors = true;
        }
        if (!EMAIL_VALIDATOR.test(fields.email) && (fields.email.length > 0)) {
            setError(prevstate => ({ ...prevstate, email: { errorMessage: INVALID_EMAIL } }));
            errors = true;
        }
        if (!PASSWORD_VALIDATOR.test(fields.password) && (fields.password.length > 0)) {
            setError(prevstate => ({ ...prevstate, password: { errorMessage: INVALID_PASSWORD } }));
            errors = true;
        }

        return errors;
    };


    const signUpSubmit = async () => {
        if (validate()) {
            return;
        }

        try {
            await createUser(fields.username, fields.email, fields.password);
            dispatch(setUserData({
                email: fields.email,
                username: fields.username
            }))
            navigate('/login');
        } catch (err) {
            return setServerError(handleServerError(err.status));
        };
    };

    return (
        <>
            <PageTitle title="Sign Up" customClassName="back__display-none" />
            <div className="create-user">
                <Input
                    placeholder='Username'
                    value={fields.username}
                    onChange={onChangeHandler}
                    type='username'
                    name='username'
                    error={error.username}
                    customClassName='create-user-input'
                />
                <Input
                    placeholder='E-mail'
                    value={fields.email}
                    onChange={onChangeHandler}
                    type='email'
                    name='email'
                    error={error.email}
                    customClassName='create-user-input'
                />
                <Input
                    placeholder='Password'
                    value={fields.password}
                    onChange={onChangeHandler}
                    type='password'
                    name='password'
                    error={error.password}
                    customClassName='create-user-input'
                />
                <Button 
                    onClick={signUpSubmit}
                    customClassName="create-user__sign-up"
                >
                    Sign Up
                </Button>
                <div className="create-user__sign-in">
                    <span>Already have an account?</span>
                    <Link to='/login'>Sign In.</Link>
                </div>
                {serverError ? <ErrorMessage errorMsg={serverError} /> : null}
            </div>
        </>
    );
};

export default CreateUserPage;