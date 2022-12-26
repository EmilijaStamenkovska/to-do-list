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
                    <p className="profile-page__name">Hi <span className="profile-page__name-user">{username}!ッ</span> Let's create some tasks!</p>
                </div>
                <div className="tasks">
                    <Link to="/create-tasks">❥ Create</Link>
                    <Link to="/my-tasks">❥ View All</Link>
                    <Link to="/important-tasks">❥ Important</Link>
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
