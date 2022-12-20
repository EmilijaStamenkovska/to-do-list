// Core
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Style
import './style.css';

const Popup = () => {
    const data = useSelector(state => state.popup);

    return (
        <div>
            <span className="message-container">{data.message}</span>
        </div>
    );
};

export default Popup;
