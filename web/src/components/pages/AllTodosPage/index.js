// Core
import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setAllTodos } from '../../../services/redux/todos-reducer';
import { setPopupActivation, setPopupMessage } from '../../../services/redux/popup-reducer';
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
    const popup_activation = dispatch(setPopupActivation(true));
    const popup_message = dispatch(setPopupMessage("Task done?"));
    const popup_message2 = dispatch(setPopupMessage("Task done?"));
    const popup_message_complete = dispatch(setPopupMessage("Complete!"));
 
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
        if (dispatch(setPopupActivation(true)) && dispatch(setPopupMessage("Task done?"))) { //demo
            try {
                await updateFinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
            // popup_activation && popup_message_complete; //demo
        } else {
            return;
        }
    };

    const handleUnfinishedTodo = async (id) => {
        if (dispatch(setPopupActivation(true)) && dispatch(setPopupMessage("Task not done?"))) { //demo
            try {
                await updateUnfinishedTodos(id);
            } catch (err) {
                console.log(err);
            }
            // popup_activation && popup_message_complete; //demo
        } else {
            return;
        }
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
