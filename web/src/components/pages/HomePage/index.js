// Core
import React from 'react';
import { Link } from "react-router-dom";
// Style
import './style.css';

const HomePage = () => {
    const token = localStorage.getItem('jwt_key');

    return (
        <>
            {
                token ?
                    <div className="main-page">
                        <Link
                            to="/my-profile"
                        >
                            My profile
                        </Link>
                        <Link
                            to="/create-tasks"
                        >
                            Create a task
                        </Link>
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                        >
                            Youtube
                        </a>
                        <Link
                            to="/calendar"
                        >
                            Calendar
                        </Link>
                    </div>
                    :
                    <div className="main-page">
                        <Link
                            to="/login"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/create-user"
                        >
                            Sign up
                        </Link>
                    </div>
            }
        </>
    );
};

export default HomePage;