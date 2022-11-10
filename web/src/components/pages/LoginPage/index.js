// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/rest/users/auth';
import Input from '../../ui/Input/index';
import Button from '../../ui/Button/index';
// Validation
import { PASSWORD_VALIDATOR, EMAIL_VALIDATOR } from '../../../services/data/validators/index';
import './style.css';
import PageTitle from '../../ui/PageTitle';

const LoginPage = () => {
    const navigate = useNavigate();

    const fieldsInit = {
        email: '',
        password: ''
    };

    const errorsInit = {
        email: { errorMessage: '' },
        password: { errorMessage: '' },
    };

    const [fields, setFields] = useState(fieldsInit);
    const [errors, setErrors] = useState(errorsInit);
    const [errorServerMsg, setErrorsServerMsg] = useState('');

    const onChangeHandler = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }) };

    const validate = () => {
        setErrors(errorsInit);
        let errors = false;

        if (fields.email.length === 0) {
            setErrors(prevstate => ({ ...prevstate, email: { errorMessage: "empty" } }));
            errors = true;
        }
        if (fields.password.length === 0) {
            setErrors(prevstate => ({ ...prevstate, password: { errorMessage: "empty" } }));
            errors = true;
        }
        if (!EMAIL_VALIDATOR.test(fields.email) && (fields.email.length > 0)) {
            setErrors(prevstate => ({ ...prevstate, email: { errorMessage: "invalid" } }));
            errors = true;
        }
        if (!PASSWORD_VALIDATOR.test(fields.password) && (fields.password.length > 0)) {
            setErrors(prevstate => ({ ...prevstate, password: { errorMessage: "invalid" } }));
            errors = true;
        }
        return errors;
    };

    const handleServerError = (err) => {
        let error = "";
        switch (err) {
            case 400:
                error = "email doesnt exist";
                break;
            case 401:
                error = "aa";
                break;
            default:
                error = "try again later";
                break;
        };
        return error;
    };

    const nav = () => {
        console.log('aaaaaaaa')
        navigate("/home");
    };

    const login = async () => {
        // if (validate()) {
        //     console.log('zzz')
        //     // return;
        // }

        // try {
        //     let body = await loginUser(fields.email, fields.password);
        //     console.log(body)
        //     let userData = body.userdata;
        //     localStorage.setItem('jwt', body.jwt);
        //     const data = { 
        //         "id": userData.uid,
        //         "username": userData.username,
        //         "email": userData.email,
        //         "role": userData.role
        //     };
        //     localStorage.setItem('userData', JSON.stringify(data));
        // } catch (err) {
        //     let er = handleServerError(err.status);
        //     if (er) {
        //         setErrorsServerMsg(er);
        //     }
        // }   
    };

    return (
        <>
            <PageTitle title="Login" />
            <div className="login-page">
                <div>
                    <Input
                        placeholder="email"
                        value={fields.email}
                        onChange={onChangeHandler}
                        type="email"
                        name="email"
                        error={errors.email}
                        customClassName="login-input"
                    />
                    <Input
                        placeholder="password"
                        value={fields.password}
                        onChange={onChangeHandler}
                        type="password"
                        name="password"
                        error={errors.password}
                        customClassName="login-input"
                    />
                    <Button 
                        customClassName="login-button"
                        onClick={nav}
                        size="small"
                    >
                        login
                    </Button>
                </div>
                {errorServerMsg ? errorServerMsg : null}
            </div>
        </>
    )
};

export default LoginPage;