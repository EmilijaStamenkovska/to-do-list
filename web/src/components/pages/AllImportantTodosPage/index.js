//Core
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';
import { setImportantTodos } from '../../../services/redux/todos-reducer';
// UI
import PageTitle from '../../ui/PageTitle';
// Widgets
import OneTodo from '../../widgets/OneTodo';
// Services
import { importantTodos, updateImportantTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const ImportantTodosPage = () => {
    const dispatch = useDispatch();

    const [allImportantTodos, setAllImportantTodos] = useState([]);
    const [fetch, setFetch] = useState(false);

    const getAllImportantTodos = async () => {
        try {
            let data = await importantTodos();
            setAllImportantTodos(data);
            dispatch(setImportantTodos(data));
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
        getAllImportantTodos();
    }, [fetch]);

    return (
        <>
            <PageTitle title="Important Tasks" back="back to profile page" />
            <div className="important-todos-page">
                {
                    allImportantTodos.map((item, key) => {
                        return (
                            <Link to={`/my-tasks/${item._id}`} key={key}>
                                <OneTodo
                                    title={item.title}
                                    description={item.description}
                                    _id={item._id}
                                    _created={item._created}
                                    state={allImportantTodos}
                                    setState={setAllImportantTodos}
                                    important={item.important}
                                    updated={handleImportantTodo}
                                    customClassNameLink="important-todos__details"
                                    active={fetch}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        </>
    );
};

export default ImportantTodosPage;
