//Core
import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setUnfinishedTodos } from '../../../services/redux/todos-reducer';
// UI
import PageTitle from '../../ui/PageTitle';
// Widgets
import OneTodo from '../../widgets/OneTodo';
// Services
import { notFinishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const UnfinishedTodosPage = () => {
    const dispatch = useDispatch();

    const [allUnfinishedTodos, setallUnfinishedTodos] = useState([]);

    const getAllUnfinishedTodos = async () => {
        try {
            let data = await notFinishedTodos();
            setallUnfinishedTodos(data);
            dispatch(setUnfinishedTodos(data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUnfinishedTodos();
    }, []);

    return (
        <>
            <PageTitle title="Unfinished Tasks" back="back to profile page" />
            <div className="unfinished-todos-page">
                {
                    allUnfinishedTodos.map((item, key) => {
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

export default UnfinishedTodosPage;
