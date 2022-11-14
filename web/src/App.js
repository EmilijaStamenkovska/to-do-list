// Core
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import CreateUserPage from './components/pages/CreateUserPage';
import RelaxPage from './components/pages/RelaxPage';
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
				<Route path='/relax' element={<RelaxPage />} />
			</Routes>
		</>
	);
}

export default App;
