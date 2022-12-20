// Core
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Redux
import { useSelector } from 'react-redux';
// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateUserPage from './components/pages/CreateUserPage';
import ProfilePage from './components/pages/ProfilePage';
import CreateTodosPage from './components/pages/CreateTodos';
import AllTodosPage from './components/pages/AllTodosPage';
import FinishedTodosPage from './components/pages/AllFinishedTodosPage';
import UnfinishedTodosPage from './components/pages/AllUnfinishedTodosPage';
import OneTodoPage from './components/pages/OneTodoPage';
import OneFinishedTodoPage from './components/pages/OneFinishedTodoPage';
import OneUnfinishedTodoPage from './components/pages/OneUnfinishedTodoPage';
import DeleteAccountPage from './components/pages/DeleteAccountPage';
// Widgets
import Header from './components/widgets/Header';
import Popup from './components/widgets/Popup';
// Style
import './assets/style/style.css';

const App = () => {
    const active = useSelector(state => state.popup.active);

	return (
		<>
			{ active && <Popup /> }
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/create-user' element={<CreateUserPage />} />
				<Route path='/my-profile' element={<ProfilePage />} />
				<Route path='/create-tasks' element={<CreateTodosPage />} />
				<Route path='/my-tasks' element={<AllTodosPage />} />
				<Route path='/unfinished-tasks' element={<UnfinishedTodosPage />} />
				<Route path='/unfinished-tasks/:id' element={<OneUnfinishedTodoPage />} />
				<Route path='/my-tasks/:id' element={<OneTodoPage />} />
				<Route path='/finished-tasks' element={<FinishedTodosPage />} />
				<Route path='/finished-tasks/:id' element={<OneFinishedTodoPage />} />
				<Route path='/delete-user' element={<DeleteAccountPage />} />
			</Routes>
		</>
	);
};

export default App;
