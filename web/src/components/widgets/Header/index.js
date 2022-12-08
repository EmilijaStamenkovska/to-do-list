// Core
import React from 'react';
import { Link } from 'react-router-dom';
// Assets
import logo from '../../../assets/images/butterfly.png';
// Style
import './style.css';

const Header = () => {
    return (
        <div className="title">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
};

export default Header;
