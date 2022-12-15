import { updateFinishedTodos, updateUnfinishedTodos } from "../../todos";

export const handleFinishedTodo = async (id) => {
    try {
        await updateFinishedTodos(id);
    } catch (err) {
        console.log(err);
    }
};

export const handleUnfinishedTodo = async (id) => {
    try {
        await updateUnfinishedTodos(id);
    } catch (err) {
        console.log(err);
    }
};