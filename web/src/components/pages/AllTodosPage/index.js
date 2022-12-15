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
import { allTodos, updateFinishedTodos, updateUnfinishedTodos } from '../../../services/rest/todos';
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
        if (window.confirm('Send task to finished?')) {
            try {
                await updateFinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
        }
        alert('Task sent to finished!');
    };

    const handleUnfinishedTodo = async (id) => {
        if (window.confirm('Send task to unfinished?')) {
            try {
                await updateUnfinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
        }
        alert('Task sent to unfinished!');
    };

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
                                finished={handleFinishedTodo}
                                unfinished={handleUnfinishedTodo}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default AllTodosPage;
