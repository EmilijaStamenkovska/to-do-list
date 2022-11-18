import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { todosFieldsInit } from '../../../services/data/inits/fields';
import { setOneTodo } from '../../../services/redux/todos-reducer';
import { oneTodo } from '../../../services/rest/todos';
import OneTodoDetails from '../../widgets/OneTodoDetails';

const OneTodoPage = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [fields, setFields] = useState(todosFieldsInit);

    const getOneTodo = async () => {

        try {
            let id = params.id;
            let data = await oneTodo(id);
            let todo_data = data.find(state => state._id === id);

            setFields(todo_data);
            dispatch(setOneTodo({
                title: todo_data.title,
                description: todo_data.description
            }));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getOneTodo();
    }, []);


    return (
        <div>
            <OneTodoDetails 
                title={fields.title}
                description={fields.description}
                _created={fields._created}
            />
        </div>
    );
};

export default OneTodoPage;