// Core
import React from 'react';
import { Route, Routes } from "react-router-dom";
// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
// Widgets
import Header from './components/widgets/Header';

const App = () => {


	return (
		<>
			<Header />
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
