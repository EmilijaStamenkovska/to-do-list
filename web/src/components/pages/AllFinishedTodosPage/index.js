//Core
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setFinishedTodos } from '../../../services/redux/todos-reducer';
// UI
import PageTitle from '../../ui/PageTitle';
// Widgets
import OneTodo from '../../widgets/OneTodo';
// Services
import { finishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const FinishedTodosPage = () => {
    const dispatch = useDispatch();

    const [allFinishedTodos, setAllFinishedTodos] = useState([]);

    const getAllFinishedTodos = async () => {
        try {
            let data = await finishedTodos();
            setAllFinishedTodos(data);
            dispatch(setFinishedTodos(data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllFinishedTodos();
    }, []);

    return (
        <>
            <PageTitle title="Finished Tasks" back="back to profile page" />
            <div className="finished-todos-page">
                {
                    allFinishedTodos.map((item, key) => {
                        return (
                            <OneTodo
                                key={key}
                                title={item.title}
                                description={item.description}
                                _id={item._id}
                                _created={item._created}
                                customClassNameDescription="aa"
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default FinishedTodosPage;
