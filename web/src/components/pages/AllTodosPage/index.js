// Core
import React, { useEffect, useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setAllTodos } from '../../../services/redux/todos-reducer';
// UI
import Button from '../../ui/Button';
import PageTitle from '../../ui/PageTitle/index';
// Widgets
import OneTodo from '../../widgets/OneTodo';
// Rest
import { allTodos, newestTodos, updateImportantTodos } from '../../../services/rest/todos';
// Style
import './style.css';

const AllTodosPage = () => {
    const dispatch = useDispatch();

    const [todos, setTodos] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleTodos = () => {
        setIsChecked(state => !state);
    };

    const getNewest = async () => {
        try {
            let data = await newestTodos();
            setTodos(data);
            toggleTodos();
        } catch (err) {
            console.log(err);
        }
    };

    const getAll = async () => {
        try {
            let data = await allTodos();
            setTodos(data);
            dispatch(setAllTodos(data));
            toggleTodos();
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
        getNewest();
        getAll();
        handleImportantTodo();
    }, [fetch]);

    return (
        <>
            <PageTitle title="My Tasks" back="back to profile page" />
            <div className="all-todos-page__buttons">
                <Button
                    onClick={getNewest}
                    type={isChecked ? "disabled" : "secondary"}
                    disabled={isChecked ? true : false}>
                    latest todos
                </Button>
                <Button
                    onClick={getAll}
                    type={isChecked ? "secondary" : "disabled"}
                    disabled={isChecked ? false : true}>
                    newest todos
                </Button>
            </div>
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
                                state={todos}
                                setState={setTodos}
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

export default AllTodosPage;
