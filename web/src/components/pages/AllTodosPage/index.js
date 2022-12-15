// Core
import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setAllTodos } from '../../../services/redux/todos-reducer';
// UI
import PageTitle from '../../ui/PageTitle/index';
// Widgets
import OneTodo from '../../widgets/OneTodo';
// Rest
import { allTodos, updateFinishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const AllTodosPage = () => {
    const dispatch = useDispatch();

    const [todos, setTodos] = useState([]);

    const getAll = async () => {
        try {
            let data = await allTodos();
            setTodos(data);
            dispatch(setAllTodos(data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleFinishedTodo = async (id) => {
        try {
            await updateFinishedTodos(id);
            setTodos([...todos.filter( p => p._id !== id)]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAll()
    }, []);

    return (
        <>
            <PageTitle title="My Tasks" back="back to profile page" />
            <div className="all-todos-page">
                {
                    todos.map((item, key) => {
                        return (
                            <OneTodo
                                key={key}
                                title={item.title}
                                description={item.description}
                                _id={item._id}
                                _created={item._created}
                                customClassNameDescription="aa"
                                finished={handleFinishedTodo}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default AllTodosPage;
