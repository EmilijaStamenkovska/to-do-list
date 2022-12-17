// Core
import React from 'react';
import { Link } from "react-router-dom";
// Style
import './style.css';

const HomePage = () => {
    return (
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
            </div>
    );
};

export default HomePage;