// Core
import React, { useState } from 'react';
import Item from '../Item';
// Style
import './style.css';
import Checkbox from '../../ui/Checkbox';
import Button from '../Button';

export const Todos = (props) => {

    const [todos, setTodos] = useState([]);
    return (
        <ol>
            {
                todos.map((todo, index) => {
                    return (
                        <li key={index}>
                            <Item 
                                todoText={todo.todoText}
                            />

                            {/* <input
                                type="checkbox" //kockicki od strana im stava za selectiranje
                                value={todo.done}
                                checked={todo.done}
                                onChange={() => markToDoAsDone(todo)}
                            /> */}
                            {/* <button onClick={() => deleteTodo(todo.id)}>
                                delete
                            </button> */}
                        </li>
                    )
                })
            }
        </ol>
    )
}

export default Todos;