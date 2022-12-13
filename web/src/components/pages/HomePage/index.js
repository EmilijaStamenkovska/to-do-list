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
            </div>
    );
};

export default HomePage;