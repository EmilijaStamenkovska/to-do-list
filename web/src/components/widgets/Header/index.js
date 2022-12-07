// Core
import React from 'react';
// Assets
import logo from '../../../assets/images/butterfly.png';
// Style
import './style.css';

const Header = () => {
    return (
        <div className="title">
            <img src={logo} alt="logo" />
        </div>
    );
};

export default Header;
