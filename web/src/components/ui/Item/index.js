// Core
import React from 'react';
import PropTypes from 'prop-types';
// UI
import Button from '../Button';
import Checkbox from '../Checkbox';
// Style
import './style.css';

const Item = (props) => {

    return (
        <div className="item">
            {/* <Checkbox 
                disabled={todo.done}
            />
            <div className="item__buttons">
                <Button style="primary" onClick={() => mark(todo)}>Edit</Button>
                <Button style="primary" onClick={() => remove(todo.id)}>Delete</Button>
            </div> */}
            <span>{props.todoText}</span>
            {/* <span className="item__border"></span> */}
        </div>
    );
};

export default Item;