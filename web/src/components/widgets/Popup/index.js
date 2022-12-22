// Core
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setPopupActivation } from '../../../services/redux/popup-reducer';
// Style
import './style.css';

const Popup = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.popup.message);

    const handlePopup = () => {
        dispatch(setPopupActivation(false));
    };
   
    return (
        <>
            <div className="modal-overlay">
                <span className="modal">{data}</span>
                <button className="modal_button" onClick={handlePopup}>x</button>
            </div> 
        </>
    );
};

export default Popup;