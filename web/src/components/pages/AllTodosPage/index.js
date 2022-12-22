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
    const [fetch, setFetch] = useState(false);

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
            setFetch(!fetch);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfinishedTodo = async (id) => {
        try {
            await updateUnfinishedTodos(id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAll()
    }, [fetch]);

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
                                state={todos}
                                setState={setTodos}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default AllTodosPage;
