// Core
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
// UI
import PageTitle from '../../ui/PageTitle';
import Button from '../../ui/Button';
// Style
import './style.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const onLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <PageTitle title="My Profile" />
            <div className="profile-page">
                <div className="profile-page__user">
                    <span className="profile-page__email">{email}</span>
                    <p className="profile-page__name">Hi <span className="profile-page__name-user">{username}!</span>ッ Let's create some tasks!</p>
                </div>
                <div className="tasks">
                    <Link to="/my-tasks">❥ My tasks</Link>
                    <Link to="/create-tasks">❥ Create tasks</Link>
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
