import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddHotelModal from './AddHotelModal.js'; 
import logo from '../Assets/logo.svg';
import { GoogleAuthProvider, signInWithPopup,  onAuthStateChanged } from 'firebase/auth';
import { Auth} from '../firebase-config.js'
import './Header.css';

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(Auth, provider);
        const user = result.user;
        console.log("User logged in: ", user);
    } catch (error) {
        console.error("Error signing in with Google:", error);
        alert("Error signing in: " + error.message);
    }
};
const signOutUser = async () => {
    try {
        await Auth.signOut();
        console.log("User signed out successfully");
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            setIsUserLoggedIn(!!user);  
        });
        return () => unsubscribe();
    }, []);

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
                {!isUserLoggedIn && (
                    <button onClick={signInWithGoogle} className="button primary">Sign in with Google</button>
                )}
                {isUserLoggedIn && (
                    <button onClick={signOutUser} className="button primary">Log out</button>
                )}
            </ul>
        </nav>
    );
};

export default Header;
