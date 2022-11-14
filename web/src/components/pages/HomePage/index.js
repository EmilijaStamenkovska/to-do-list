// Core
import React from 'react';
import { Link } from "react-router-dom";
// Assets
import img from '../../../assets/images/img.png';
// Style
import './style.css';

const HomePage = () => {
    return (
        <>
            <div className="main-page">
                <Link
                    to="/my-profile"
                    className="main-page__profile"
                >
                    Go to profile 🦋
                </Link>
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    className="main-page__videos"
                >
                    Listen to some music 📻
                </a>
                <Link
                    to="/create-todo"
                    className="main-page__create__todos"
                >
                    📝Create todos
                </Link>
                <a
                    href="https://www.junkybooks.com/"
                    target="_blank"
                    className="main-page__books"
                    rel="noreferrer"
                >
                    📙 Read a book
                </a>
                <Link
                    to="/relax"
                    className="main-page__pictures"
                >
                    Take a deep breath and relax your brain🌼
                </Link>
                <span className="main-page__text">
                    ...organize your time
                </span>
            </div>
            <img
                className="imgs"
                src={img}
                alt=""
            />
        </>
    );
};

export default HomePage;