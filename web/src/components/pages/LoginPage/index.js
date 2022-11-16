// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../../services/redux/reducers';
// UI
import Input from '../../ui/Input/index';
import Button from '../../ui/Button/index';
import PageTitle from '../../ui/PageTitle';
import ErrorMessage from '../../ui/ErrorMessage';
// Auth
import { loginUser } from '../../../services/rest/users/auth';
// Validation
import { PASSWORD_VALIDATOR, EMAIL_VALIDATOR } from '../../../services/data/validators/index';
// Data
import { EMPTY_FIELD, INVALID_EMAIL, INVALID_PASSWORD } from '../../../services/data/errors/client';
import { fieldsInit } from '../../../services/data/inits/fields/index';
import { errorsInit } from '../../../services/data/inits/errors/index';
// Rest
import { handleServerError } from '../../../services/rest/errors/server/index';
// Style
import './style.css';


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fields, setFields] = useState(fieldsInit);
    const [error, setError] = useState(errorsInit);
    const [serverError, setServerError] = useState('');

    const onChangeHandler = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }) };

    const validate = () => {
        setError(errorsInit);
        let errors = false;

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

    const loginSubmit = async () => {
        if (validate()) {
            return;
        }

        try {
            let body = await loginUser(fields.email, fields.password);
            const jwt_key = body.jwt;

            dispatch(setUserData({ email: fields.email }));
            dispatch(setToken({ jwt_key: jwt_key }));

            localStorage.setItem('jwt_key', jwt_key);

            navigate('/create-user');
        } catch (err) {
            return setServerError(handleServerError(err.status));
        }
    };

    return (
        <>
            <PageTitle title="Sign In" />
            <div className="login-page">
                <Input
                    placeholder="E-mail"
                    value={fields.email}
                    onChange={onChangeHandler}
                    type="email"
                    name="email"
                    error={error.email}
                    customClassName="login-input"
                />
                <Input
                    placeholder="Password"
                    value={fields.password}
                    onChange={onChangeHandler}
                    type="password"
                    name="password"
                    error={error.password}
                    customClassName="login-input"
                />

                <Button
                    customClassName="login-button"
                    onClick={loginSubmit}
                    size="small"
                >
                    Sign In
                </Button>
                {serverError ? <ErrorMessage errorMsg={serverError} /> : null}
            </div>
        </>
    )
};

export default LoginPage;