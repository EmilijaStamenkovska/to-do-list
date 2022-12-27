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
import { notFinishedTodos, updateImportantTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const UnfinishedTodosPage = () => {
    const dispatch = useDispatch();

    const [allUnfinishedTodos, setAllUnfinishedTodos] = useState([]);
    const [fetch, setFetch] = useState(false);

    const getAllUnfinishedTodos = async () => {
        try {
            let data = await notFinishedTodos();
            setAllUnfinishedTodos(data);
            dispatch(setUnfinishedTodos(data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleImportantTodo = async (id) => {
        try {
           await updateImportantTodos(id);
           setFetch(!fetch);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUnfinishedTodos();
    }, [fetch]);

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
                                state={allUnfinishedTodos}
                                setState={setAllUnfinishedTodos}
                                important={item.important}
                                updated={handleImportantTodo}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default UnfinishedTodosPage;
