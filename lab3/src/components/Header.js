import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddHotelModal from './AddHotelModal'; 
import './Header.css';
import logo from '../Assets/logo.svg';


const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <nav className="header-navigation">
            <img src={logo} className="logo" alt="Tranquil Travels Logo" />
            <ul className="nav-links">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/#findoffers">Find offers</Link></li>
                <li>
                    <Link className="nav-link" onClick={() => setModalOpen(true)}>Add New Offer</Link>
                    <AddHotelModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSave={(newHotel) => console.log(newHotel)} />
                </li>
                <li><Link className="nav-link" to="/#myoffers">My offers</Link></li>
                <li><Link className="nav-link" to="/#favorites">Favorites</Link></li>
                <button className="button primary">Log out</button>
            </ul>
            <button className="button hidButtn hidden">Menu</button>
        </nav>
    );
};

export default Header;
