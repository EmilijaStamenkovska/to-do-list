// Core
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// UI
import Input from '../../ui/Input/index';
import Button from '../../ui/Button/index';
import PageTitle from '../../ui/PageTitle/index';
import ErrorMessage from '../../ui/ErrorMessage';
// Auth
import {validatePassword, deleteUser} from '../.././../services/rest/users/auth';
// Validation
import { PASSWORD_VALIDATOR } from '../../../services/data/validators/index';
// Data
import { EMPTY_FIELD, INVALID_PASSWORD } from '../../../services/data/errors/client';
import { fieldsInit } from '../../../services/data/inits/fields';
import { errorsInit } from '../../../services/data/inits/errors';
// Rest
import { handleServerError } from '../../../services/rest/errors/server';
// Style
import './style.css';

const DeleteAccountPage = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');
    
    const [fields, setFields] = useState(fieldsInit);
    const [error, setError] = useState(errorsInit);
    const [serverError, setServerError] = useState('');
    
    const onChangeHandler = (e) => { setFields({ ...fields, [e.target.name]: e.target.value }); }
    
    const validate = () => {
        setError(errorsInit);
        let errors = false;

        if (fields.password.length === 0) {
            setError(prevstate => ({ ...prevstate, password: { errorMessage: EMPTY_FIELD } }));
            errors = true;
        }
        if (!PASSWORD_VALIDATOR.test(fields.password) && (fields.password.length > 0)) {
            setError(prevstate => ({ ...prevstate, password: { errorMessage: INVALID_PASSWORD } }));
            errors = true;
        }
        return errors;
    };

    const handleDeleteAccount = async () => {

        if (validate()) {
            return;
        }

        try {
            await validatePassword(userId, fields.password);
            await deleteUser(userId);
            localStorage.clear();
            navigate('/login');
        } catch (err) {
            return setServerError(handleServerError(err.status));
        }
    };

    return (
        <>
            <PageTitle title="Delete Account" back="back to profile page" />
            <div className="delete-account-page__main">
                <div className="delete-account-page">
                    <span className="delete-account-page__text">༄ Are you sure you want to delete your account?</span>
                    <span className="delete-account-page__text">༄ Once your account is deleted, all of your tasks will be permanently deleted!</span>
                    <span className="delete-account-page__text">༄ Please enter your password to confirm you would like to permanently delete your account.</span>
                </div>
                <Input 
                    placeholder="password..."
                    name="password"
                    type="password"
                    value={fields.password}
                    onChange={onChangeHandler}
                    error={error.password}
                />
                <Button
                    onClick={handleDeleteAccount}
                >
                    delete account
                </Button>
                {serverError ? <ErrorMessage errorMsg={serverError} /> : null}
            </div>
        </>
    );
};

export default DeleteAccountPage;
