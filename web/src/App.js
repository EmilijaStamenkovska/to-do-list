// Core
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateUserPage from './components/pages/CreateUserPage';
import RelaxPage from './components/pages/RelaxPage';
import ProfilePage from './components/pages/ProfilePage';
import CreateTodosPage from './components/pages/CreateTodos';
import AllTodosPage from './components/pages/AllTodosPage';
// Widgets
import Header from './components/widgets/Header';
import OneTodo from './components/widgets/OneTodo';
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
				<Route path='/relax' element={<RelaxPage />} />
				<Route path='/my-profile' element={<ProfilePage />} />
				<Route path='/create-tasks' element={<CreateTodosPage />} />
				<Route path='/my-task' element={<OneTodo />} />
				<Route path='/my-tasks' element={<AllTodosPage />} />
			</Routes>
		</>
	);
}

export default App;
