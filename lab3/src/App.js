import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HotelList from './components/HotelList.js';
import HotelDetail from './components/HotelDetail.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import './App.css';

const App = () => {
    const location = useLocation();

    return (
       
        <div className="App">
            <body>
            <Header />
            {location.pathname === '/' && <Hero />}
            <Routes>
                <Route path="/" element={<HotelList />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
            </Routes>
            </body> 
        </div>
       
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
