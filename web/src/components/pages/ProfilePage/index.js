// Core
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../services/redux/reducers';
// UI
import PageTitle from '../../ui/PageTitle';
import Button from '../../ui/Button';
// Auth
import { getOne } from '../../../services/rest/users/auth';
// Data
import { fieldsInit } from '../../../services/data/inits/fields';
// Style
import './style.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = localStorage.getItem('id');

    const [fields, setFields] = useState(fieldsInit);

    const getOneUser = async () => {
        try {
            let data = await getOne(id);
            setFields(data);

            dispatch(setUserData({
                username: fields.username,
                email: fields.email
            }))
        } catch (err) {
            console.log(err);
        }
    };

    const onLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        getOneUser();
    }, []);

    return (
        <>
            <PageTitle title="My Profile" />
            <div className="profile-page">
                <div className="profile-page__user">
                    <span className="profile-page__email">{fields.email}</span>
                    <p className="profile-page__name">Hi <span className="profile-page__name-user">{fields.username}!ッ</span> Let's create some tasks!</p>
                </div>
                <div className="tasks">
                    <Link to="/create-tasks">❥ Create</Link>
                    <Link to="/my-tasks">❥ All</Link>
                    <Link to="/important-tasks">❥ Saved</Link>
                    <Link to="/finished-tasks">❥ Finished</Link>
                    <Link to="/unfinished-tasks">❥ Unfinished</Link>
                    <Link to="/">❥ Back to home page</Link>
                </div>
                <div className="profile-page__logout-button-and-delete-user">
                    <Button
                        onClick={onLogout}
                        customClassName="profile-page__logout-button"
                        type="primary"
                    >
                        Sign Out
                    </Button>
                    <Link
                        to="/delete-user"
                        className="profile-page__delete-user"
                    >
                        delete profile
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
