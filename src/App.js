// Core
import { useEffect, useState } from 'react';
// UI
import Button from './Button';
import Input from './Input';
// Widgets
import Header from './Header';
import Todos from './Todos';
// Style
import './style.css';
import { DATA } from './fakedata';

const App = () => {
	const [todos, setTodos] = useState(
	   [
		  { id: 0, todoText: "React Course", done: false },
		  { id: 1, todoText: "Eat Dinner", done: false },
		  { id: 2, todoText: "Go To Sleep", done: false }
	   ]
	);
	const [newTodo, setNewTodo] = useState("")

	const onClickHandler = (e) => {
		setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
	};

	function addTodo() {
		if (newTodo.trim() !== '') {
		   let newObject = {
			  id: todos.length,
			  todoText: newTodo,
			  done: false
		   }
		   setTodos([...todos, newObject]);
		   setNewTodo(''); //se resetira vrednosta
		} else {
		   alert('No value entered!\nPlease enter text to add a new item')
		}
	 }
  
	 function markTodoAsDone(todo) {
		setTodos([
		   ...todos.map(item => (item.id === todo.id) ? //so ovoj uslov go baram kliknatiot element po id 
			  { id: item.id, todoText: item.todoText, done: !item.done }  //ako go najde elementot vrati gi istite props samo toggle na done
			  : item //ako ne e toj item kliknat, za site ostanati vrati gi istite
		   )
		])
		console.log(todos)
	 }
  
	 function handleDelete(id) {
		const removeTodo = todos.filter((todo) => {
		   return todo.id !== id
		})
		setTodos(removeTodo)
	 };

	useEffect(() => {
		console.log(todos)
	 }, [todos])
  
	return (
		<div className="main__page">
			<Header />
			<div className="main__page__input_button">
				<Input
					value={newTodo}
					onChange={onClickHandler}
					type="todo"
					name="todo"
				/>
				<Button
					size="small"
					type="primary"
					onClick={addTodo}
				>
					Add
				</Button>
			</div>
			<Todos listOfTodos={todos} markToDoAsDone={markTodoAsDone} deleteTodo={handleDelete} />
		</div>
	);
}

export default App;
