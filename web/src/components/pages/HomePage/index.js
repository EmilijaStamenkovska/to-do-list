// Core
import React from 'react';
import { Link } from "react-router-dom";
// Style
import './style.css';

const HomePage = () => {
    return (
        <div className="main-page">
            <div className="main-page__my-profile">
                <Link
                    to="/my-profile"
                >
                    My profile
                </Link>
            </div>
            <div className="main-page__create-tasks">
                <Link
                    to="/create-tasks"
                >
                    Create a task
                </Link>
            </div>
        </div>
    );
};

export default HomePage;