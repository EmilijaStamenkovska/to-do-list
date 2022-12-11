// Core
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateUserPage from './components/pages/CreateUserPage';
import ProfilePage from './components/pages/ProfilePage';
import CreateTodosPage from './components/pages/CreateTodos';
import AllTodosPage from './components/pages/AllTodosPage';
import OneTodoPage from './components/pages/OneTodoPage';
import FinishedTodosPage from './components/pages/FinishedTodosPage';
import OneFinishedTodoPage from './components/pages/OneFinishedTodoPage';
import UnfinishedTodosPage from './components/pages/UnfinishedTodosPage';
import OneUnfinishedTodoPage from './components/pages/OneUnfinishedTodoPage';
// Widgets
import Header from './components/widgets/Header';
// Style
import './assets/style/style.css';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/create-user' element={<CreateUserPage />} />
				<Route path='/my-profile' element={<ProfilePage />} />
				<Route path='/create-tasks' element={<CreateTodosPage />} />
				<Route path='/my-tasks' element={<AllTodosPage />} />
				<Route path='/my-tasks/:id' element={<OneTodoPage />} />
				<Route path='/finished-tasks' element={<FinishedTodosPage />} />
				<Route path='/finished-tasks/:id' element={<OneFinishedTodoPage />} />
				<Route path='/unfinished-tasks' element={<UnfinishedTodosPage />} />
				<Route path='/unfinished-tasks/:id' element={<OneUnfinishedTodoPage />} />
			</Routes>
		</>
	);
};

export default App;
