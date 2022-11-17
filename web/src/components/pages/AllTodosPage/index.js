import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { setAllTodos } from '../../../services/redux/todos-reducer';
import { allTodos } from '../../../services/rest/todos';
import OneTodo from '../../widgets/OneTodo';

const AllTodosPage = () => {
    const dispatch = useDispatch();

    const [todos, setTodos] = useState([]);

    const getAll = async () => {
        try {
            let data = await allTodos();
            setTodos(data);
            dispatch(setAllTodos(data))
        } catch (err) {
            console.log(err);
        }
    };  

    useEffect(() => {
        getAll()
    }, []);

    return (
        <></>
        // <div>
        //     {
        //         todos.map((i, key) => {
        //             return (
        //                 <OneTodo 
        //                     key={key}
        //                     data={fields.data}
        //                 />
        //             )
        //         })
        //     }
        // </div>
    );
};  

export default AllTodosPage;
