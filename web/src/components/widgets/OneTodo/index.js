import React, { useEffect, useState } from 'react';
import { oneTodo } from '../../../services/rest/todos';
import { todosFieldsInit } from '../../../services/data/inits/fields/index';
import Button from '../../ui/Button/index';
import { useDispatch, useSelector } from 'react-redux';
import { setOneTodo } from '../../../services/redux/todos-reducer';

const OneTodo = (props) => {

    const [fields, setFields] = useState(todosFieldsInit);

    const TEST = async () => {
        try { 
            let id = "63766a09e9a756249d6cb250"
            let data = await oneTodo(id, fields.title);
            setFields({
                title: data.title
            });
            // console.log(e);
        } catch (err) {
            console.log(err);
        }
    }; 

    useEffect(() => {
        TEST();
    }, []);

    return (
        <div>
            <span>{fields.data}</span>
        </div>
    );
};

export default OneTodo;
