// Core
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Style
import './style.css';

const Popup = (props) => {
    const data = useSelector(state => state.popup.message);
   
    return (
        <>
            <div className="modal-overlay">
                <span className="modal">{data}</span>
                <button className="modal_button" onClick={props.onClick}>x</button>
            </div>

        </>
    );
};

export default Popup;
