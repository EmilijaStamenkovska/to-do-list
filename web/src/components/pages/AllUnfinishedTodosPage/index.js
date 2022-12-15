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
import { notFinishedTodos, updateFinishedTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const UnfinishedTodosPage = () => {
    const dispatch = useDispatch();

    const [allUnfinishedTodos, setAllUnfinishedTodos] = useState([]);

    const getAllUnfinishedTodos = async () => {
        try {
            let data = await notFinishedTodos();
            setAllUnfinishedTodos(data);
            dispatch(setUnfinishedTodos(data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleFinishedTodo = async (id) => {
        if (window.confirm('Send task to finished?')) {

        try {
            await updateFinishedTodos(id);
            setAllUnfinishedTodos([...allUnfinishedTodos.filter(item => item._id !== id)]);
        } catch (err) {
            console.log(err);
        }
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
                                finished={handleFinishedTodo}
                                buttonTypeU={true}
                            />
                        )
                    })
                }
            </div>
        </>
    );
};

export default UnfinishedTodosPage;
