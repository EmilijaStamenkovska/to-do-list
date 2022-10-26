// Core
import React, { useState } from 'react';
import Item from '../Item';
// Style
import './style.css';
import Checkbox from '../Checkbox';
import Button from '../Button';

export const Todos = ({ listOfTodos, markToDoAsDone, deleteTodo }) => {

    return (
        <ol>
            {listOfTodos.map((todo, i) => {
                return (
                    <li key={todo.id}>
                        <span>{todo.todoText}</span>
                        <input 
                            type="checkbox" //kockicki od strana im stava za selectiranje
                            value={todo.done}
                            checked={todo.done}  
                            onChange={ () => markToDoAsDone(todo) }  
                        />
                        <button onClick={() => deleteTodo(todo.id)}>
                            delete
                        </button>
                    </li>
                )
            })}
            
        </ol>
    )
}

export default Todos;